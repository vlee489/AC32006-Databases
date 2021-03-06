const { gql, ForbiddenError, UserInputError } = require('apollo-server-express');
const { Branch } = require('../models/branch');
const { Products } = require('../models/products');
const { Inventory } = require('../models/inventory');
const { IdError } = require('../func/errors');

const typeDefs = gql`
  "Represents an Inventory"
  type Inventory{
    InventoryID: ID
    QTY: Int
    Branch: Branch
    Product: Product
  }

  extend type Query{
    "Get inventory of a store"
    getInventory(BranchID: ID!, ProductID: ID): [Inventory]
    getBranchesInStock(
        Products: [ProductOrder]!
    ): [Branch]
  }

  extend type Mutation{
    "Update the inventory of a product at a branch, adds product to inventory if it doesn't exist"
    updateInventory(
        BranchID: ID!
        ProductID: ID!
        Qty: Int!
    ): Inventory
  }
`;
const resolvers = {
    Query: {
        getInventory: async (parent, arg, ctx, info) => {
            inventoryQuery = Inventory.query().where('BranchID', arg.BranchID)
            if ('ProductID' in arg) {
                inventoryQuery = inventoryQuery.where('ProductID', arg.ProductID)
            }
            branchQuery = Branch.query().findById(arg.BranchID)
            inventoryQuery = await inventoryQuery
            reply = []
            for (const item in inventoryQuery) {
                reply.push({
                    InventoryID: inventoryQuery[item].InventoryID,
                    QTY: inventoryQuery[item].QTY,
                    Branch: branchQuery,
                    Product: (await Products.query().findById(inventoryQuery[item].ProductID)),
                })
            }
            return reply
        },

        getBranchesInStock: async (parent, arg, ctx, info) => {
            branchQuery = await Branch.query()
            for (const i in arg.Products) {
                productQuery = await Products.query().findById(arg.Products[i].ProductID)
                if (!productQuery instanceof Products) {
                    throw new IdError( `Product: ${arg.Details.Products[item].ProductID} does not exist`, { invalidArgs: Object.keys(arg) })
                }
            }
            reply = []
            for(const b in branchQuery){
                var itemCount = 0
                for (const i in arg.Products) {
                    inventoryQuery = await Inventory.query().where('ProductID', arg.Products[i].ProductID).where('BranchID', branchQuery[b].BranchID)
                    if(inventoryQuery.length == 1){
                        if(inventoryQuery[0].QTY >= arg.Products[i].Qty){
                            itemCount++
                        }
                    }else if(inventoryQuery.length > 1){
                        throw new Error("Internal error, found more then one product in a branch")
                    }
                }
                if(itemCount >= (arg.Products).length){
                    reply.push(branchQuery[b])
                }
            }
            return reply
        }
    },
    Mutation: {
        updateInventory: async (parent, arg, ctx, info) => {
            if (ctx.auth) {
                // Check if product and branch exist
                branchQuery = await Branch.query().findById(arg.BranchID)
                productQuery = await Products.query().findById(arg.ProductID)
                if(!(branchQuery instanceof Branch) || !(productQuery instanceof Products)){
                    throw new IdError(
                        'Branch or Product does not exist', { invalidArgs: Object.keys(arg) }
                      )
                }

                var inventoryQuery = await Inventory.query().where('BranchID', arg.BranchID).where('ProductID', arg.ProductID)
                if(inventoryQuery.length == 0){
                    inventoryQuery = await Inventory.query().insert({
                        ProductID: arg.ProductID,
                        BranchID: arg.BranchID,
                        QTY: arg.Qty,
                    })
                }else if(inventoryQuery.length > 1){
                    throw new Error(
                        "More then one entry for branch and product, contact admin!"
                    )
                }else{
                    inventoryQuery = await Inventory.query().patchAndFetchById(inventoryQuery[0].InventoryID, {QTY: arg.Qty})
                }
                return {
                    InventoryID: inventoryQuery.InventoryID,
                    QTY: inventoryQuery.QTY,
                    Branch: branchQuery,
                    Product: productQuery,
                }
            }else {
                throw new ForbiddenError(
                  'Authentication token is invalid, please log in'
                )
              }
        }
    },
};

module.exports = {
    Inventory: typeDefs,
    InventoryResolvers: resolvers,
}