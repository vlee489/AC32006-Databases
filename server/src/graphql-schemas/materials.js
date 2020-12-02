const { gql, ForbiddenError } = require('apollo-server-express');
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
                    for(const x in SuppliersCatalogueQuery){
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
    }
}

module.exports = {
    Materials: typeDefs,
    MaterialsResolvers: resolvers,
}
