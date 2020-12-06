const { gql, ForbiddenError, ValidationError } = require('apollo-server-express');
const { Suppliers } = require('../models/suppliers')
const { MaterialsCatalogue } = require('../models/materialsCatalogue')
const { SuppliersCatalogue } = require('../models/suppliersCatalogue')

const typeDefs = gql`
    "Represents a Material's details"
    type Material{
        MaterialID: ID
        Name: String
        PartType: String
        Price: Float
        SKU: String
        Description: String
        Weight: Float
        Suppliers: [Supplier]
    }

    extend type Query{
        getMaterials(
            MaterialID: ID
        ): [Material]
    }

    extend type Mutation{
        "Add a Material to the materials database"
        addMaterial(
            Name: String!
            PartType: String!
            Price: Float!
            SKU: String!
            Description: String!
            Weight: Float!
            "ID of the suppliers supply the material"
            Suppliers: [Int]!
        ): Material
    }
`

const resolvers = {
    Query: {
        getMaterials: async (parent, arg, ctx, info) => {
            if (ctx.auth) {
                materialQuery = MaterialsCatalogue.query()
                if ('MaterialID' in arg) {
                    materialQuery = materialQuery.where('MaterialID', arg.MaterialID)
                }
                materialQuery = await materialQuery
                reply = []
                for (const i in materialQuery) {
                    supplierHold = []
                    SuppliersCatalogueQuery = await SuppliersCatalogue.query().where('MaterialID', materialQuery[i].MaterialID)
                    for (const x in SuppliersCatalogueQuery) {
                        supplierHold.push((await Suppliers.query().findById(SuppliersCatalogueQuery[x].SupplierID)))
                    }
                    reply.push({
                        MaterialID: materialQuery[i].MaterialID,
                        Name: materialQuery[i].Name,
                        PartType: materialQuery[i].PartType,
                        Price: materialQuery[i].Price,
                        SKU: materialQuery[i].SKU,
                        Description: materialQuery[i].Description,
                        Weight: materialQuery[i].Weight,
                        Suppliers: supplierHold
                    })
                }
                return reply
            } else {
                throw new ForbiddenError(
                    'Authentication token is invalid, please log in'
                )
            }
        }
    },
    Mutation: {
        addMaterial: async (parent, arg, ctx, info) => {
            if (ctx.auth) {
                // Check if Supplies exist
                supplierStore = []  // Used to build the return message
                supplierInsert = []  // Used to insert suppliers into DB
                for (const i in arg.Suppliers) {
                    supplierQuery = await Suppliers.query().findById(arg.Suppliers[i])
                    if (supplierQuery instanceof Suppliers) {
                        supplierStore.push(supplierQuery)
                        supplierInsert.push({
                            SupplierID: arg.Suppliers[i]
                        })
                    } else {
                        throw new ValidationError(`Supplier ${arg.Suppliers[i]} does not exist`)
                    }
                }
                // Graph Insert
                materialInsert = await MaterialsCatalogue.query().insertGraphAndFetch({
                    Name: arg.Name,
                    PartType: arg.PartType,
                    Price: arg.Price,
                    SKU: arg.SKU,
                    Description: arg.Description,
                    Weight: arg.Weight,
                    supplierCatalogue: supplierInsert // Insert relation to supplier via graph insert
                })
                return {
                    MaterialID: materialInsert.MaterialID,
                    Name: materialInsert.Name,
                    PartType: materialInsert.PartType,
                    Price: materialInsert.Price,
                    SKU: materialInsert.SKU,
                    Description: materialInsert.Description,
                    Weight: materialInsert.Weight,
                    Suppliers: supplierStore
                }
            } else {
                throw new ForbiddenError(
                    'Authentication token is invalid, please log in'
                )
            }
        }
    }
}

module.exports = {
    Materials: typeDefs,
    MaterialsResolvers: resolvers,
}
