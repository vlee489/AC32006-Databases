const { gql, ForbiddenError, ValidationError } = require('apollo-server-express');
const { Suppliers } = require('../models/suppliers')
const { MaterialsCatalogue } = require('../models/materialsCatalogue')
const { SuppliersCatalogue } = require('../models/suppliersCatalogue')
const { Storage } = require('../models/storage');
const { getStorageItem } = require('../func/storageHelper');

const typeDefs = gql`
    "Get storage details"
    type Storage{
        StorageID: ID
        Stock: Int
        StorageLocation: String
        Material: Material
    }

    extend type Query{
        "Get a material that's in storage"
        getStorage(
            MaterialID: ID
        ): [Storage]
        "Get the details of a storage entry"
        getStorageEntry(
            StorageID: ID!
        ): Storage
    }

    extend type Mutation{
        "Update of a stock of an item"
        updateStock(
            StorageID: ID!
            Stock: Int!
        ): Storage
        "Add a material to storage"
        addMaterialToStorage(
            MaterialID: ID!
            StorageLocation: String!
            Stock: Int!
        ): Storage
    }
`;

const resolvers = {
    Query: {
        getStorage: async (parent, arg, ctx, info) => {
            if (ctx.auth) {
                storageQuery = Storage.query()
                if ('MaterialID' in arg) {
                    storageQuery = storageQuery.where('MaterialID', arg.MaterialID)
                }
                storageQuery = await storageQuery
                reply = []
                for (const i in storageQuery) {
                    materialsCatalogueQuery = await MaterialsCatalogue.query().findById(storageQuery[i].MaterialID)
                    suppliersCatalogueQuery = await SuppliersCatalogue.query().where('MaterialID', materialsCatalogueQuery.MaterialID)
                    supplierHold = []
                    for (const s in suppliersCatalogueQuery) {
                        supplierHold.push((await Suppliers.query().findById(suppliersCatalogueQuery[s].SupplierID)))
                    }
                    reply.push({
                        StorageID: storageQuery[i].StorageID,
                        Stock: storageQuery[i].Stock,
                        StorageLocation: storageQuery[i].StorageLocation,
                        Material: {
                            MaterialID: materialsCatalogueQuery.MaterialID,
                            Name: materialsCatalogueQuery.Name,
                            PartType: materialsCatalogueQuery.PartType,
                            Price: materialsCatalogueQuery.Price,
                            SKU: materialsCatalogueQuery.SKU,
                            Description: materialsCatalogueQuery.Description,
                            Weight: materialsCatalogueQuery.Weight,
                            Suppliers: supplierHold
                        }
                    })
                }
                return reply
            } else {
                throw new ForbiddenError(
                    'Authentication token is invalid, please log in'
                )
            }
        },

        getStorageEntry: async (parent, arg, ctx, info) => {
            if (ctx.auth) {
                return (await getStorageItem(arg.StorageID))
            } else {
                throw new ForbiddenError(
                    'Authentication token is invalid, please log in'
                )
            }
        }
    },
    Mutation: {
        updateStock: async (parent, arg, ctx, info) => {
            if (ctx.auth) {
                storageQuery = await Storage.query().findById(arg.StorageID)
                if(storageQuery instanceof Storage){
                    storageUpdate = await Storage.query().findById(arg.StorageID).patchAndFetch({
                        Stock: arg.Stock
                    })
                    if(storageUpdate instanceof Storage){
                        return (await getStorageItem(arg.StorageID))
                    }else{
                        throw new Error(`Internal Error`)
                    }
                }else{
                    throw new IdError(`No item in storage is with StorageID:${arg.StorageID}`)
                }
            } else {
                throw new ForbiddenError(
                    'Authentication token is invalid, please log in'
                )
            }
        },
        addMaterialToStorage: async (parent, arg, ctx, info) => {
            if (ctx.auth) {
                //Check that material doesn't have an instence in stroage already
                storageQuery = await Storage.query().findOne('MaterialID', arg.MaterialID)
                if(storageQuery instanceof Storage){
                    throw new ValidationError(`Material already in storage`)
                }
                // Check material exists
                materialQuery = await MaterialsCatalogue.query().findById(arg.MaterialID)
                if(!(materialQuery instanceof MaterialsCatalogue)){
                    throw new ValidationError(`Material doesn not exist`)
                }
                storageInsert = await Storage.query().insertAndFetch({
                    Stock: arg.Stock,
                    StorageLocation: arg.StorageLocation,
                    MaterialID: arg.MaterialID
                })
                if(storageInsert instanceof Storage){
                    return (await getStorageItem(storageInsert.StorageID))
                }else{
                    throw new Error("Internal Error")
                }
            } else {
                throw new ForbiddenError(
                    'Authentication token is invalid, please log in'
                )
            }
        }
    }
};

module.exports = {
    Storage: typeDefs,
    StorageResolvers: resolvers,
}