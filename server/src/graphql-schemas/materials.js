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

    input materialDetails{
        Name: String! @constraint(minLength: 1, maxLength: 45)
        PartType: String! @constraint(minLength: 1, maxLength: 45)
        Price: Float!
        SKU: String! @constraint(minLength: 1, maxLength: 45)
        Description: String!
        Weight: Float!
        "ID of the suppliers supply the material"
        Suppliers: [Int]!
    }

    extend type Mutation{
        "Add a Material to the materials database"
        addMaterial(
            Details: materialDetails!
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
                for (const i in arg.Details.Suppliers) {
                    supplierQuery = await Suppliers.query().findById(arg.Details.Suppliers[i])
                    if (supplierQuery instanceof Suppliers) {
                        supplierStore.push(supplierQuery)
                        supplierInsert.push({
                            SupplierID: arg.Details.Suppliers[i]
                        })
                    } else {
                        throw new ValidationError(`Supplier ${arg.Details.Suppliers[i]} does not exist`)
                    }
                }
                // Graph Insert
                materialInsert = await MaterialsCatalogue.query().insertGraphAndFetch({
                    Name: arg.Details.Name,
                    PartType: arg.Details.PartType,
                    Price: arg.Details.Price,
                    SKU: arg.Details.SKU,
                    Description: arg.Details.Description,
                    Weight: arg.Details.Weight,
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
