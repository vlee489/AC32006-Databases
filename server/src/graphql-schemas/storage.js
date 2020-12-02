const { gql, ForbiddenError } = require('apollo-server-express');
const { Suppliers } = require('../models/suppliers')
const { MaterialsCatalogue } = require('../models/materialsCatalogue')
const { SuppliersCatalogue } = require('../models/suppliersCatalogue')
const { Storage } = require('../models/storage');

const typeDefs = gql`
    "Get storage details"
    type Storage{
        StorageID: ID
        Stock: Int
        StorageLocation: String
        Material: Material
    }

    extend type Query{
        "Get a material that's in sotrage"
        getStorage(
            MaterialID: ID
        ): [Storage]
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
        }
    }
};

module.exports = {
    Storage: typeDefs,
    StorageResolvers: resolvers,
}