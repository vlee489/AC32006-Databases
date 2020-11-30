/*
Defines all the Scheme for Warehouse related GraphQL functions
*/
const { gql } = require('apollo-server-express');
const { Products } = require('../models/products');
const { Warehouse } = require('../models/warehouse');
const { WarehouseProducts } = require('../models/warehouseProducts');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  "Represents A warehouse's details"
  type Warehouse{
      WarehouseID: ID
      Name: String
      Address1: String
      Address2: String
      City: String
      Region: String
      Country: String
      Postcode: String
      PhoneNumber: String
      Email: String
  }

  type WarehouseProduct{
    WarehouseProductID: ID
    Product: Product
    Qty: Int
    Location: String
    Warehouse: Warehouse
  }

  extend type Query{
    "Get details on a warehouse"
    getWarehouse(
      WarehouseID: ID, 
      Address1: String, 
      Address2: String, 
      City: String, 
      Region: String, 
      Country: String, 
      Postcode: String
    ): [Warehouse]

    "Get the Products housed in a warehouse"
    getWarehouseProducts(
      WarehouseID: ID!
      ProductID: ID
    ): [WarehouseProduct]
    
    "Get the warehouses with a product"
    getWarehouseWithProduct(
      ProductID: ID!
    ): [WarehouseProduct]
  }

  extend type Mutation{
    "Update an qty of a product in a warehouse"
    updateQTYofWarehouseProduct(
      WarehouseID: ID!
      ProductID: ID!
      Qty: Int!
    ): WarehouseProduct
  }
`;


const resolvers = {
  Query: {
    getWarehouse: async (parent, arg, ctx, info) => {
      dbQuery = Warehouse.query();
      if ('WarehouseID' in arg) {
        dbQuery = dbQuery.where('WarehouseID', arg.WarehouseID);
      }
      if ('Address1' in arg) {
        dbQuery = dbQuery.where('Address1', arg.Address1);
      }
      if ('Address2' in arg) {
        dbQuery = dbQuery.where('Address2', arg.Address2);
      }
      if ('City' in arg) {
        dbQuery = dbQuery.where('City', arg.City);
      }
      if ('Region' in arg) {
        dbQuery = dbQuery.where('Region', arg.Region);
      }
      if ('Country' in arg) {
        dbQuery = dbQuery.where('Country', arg.Country);
      }
      if ('Postcode' in arg) {
        dbQuery = dbQuery.where('Postcode', arg.Postcode);
      }
      return await dbQuery;
    },

    getWarehouseProducts: async (parent, arg, ctx, info) => {
      if (ctx.auth) {
        // Check if warehouse exists
        warehouseQuery = await Warehouse.query().findById(arg.WarehouseID)
        if (!(warehouseQuery instanceof Warehouse)) {
          throw new UserInputError(
            'Warehouse does not exist', { invalidArgs: Object.keys(arg) }
          )
        }
        // Build the query to warehouseProducts
        warehouseProductsQuery = WarehouseProducts.query().where('WarehouseID', arg.WarehouseID)
        if ('ProductID' in arg) {
          warehouseQuery = warehouseQuery.where('ProductID', arg.ProductID)
        }
        warehouseQuery = await warehouseQuery
        reply = [] // Holds item for reply
        for (const item in warehouseQuery) {
          reply.push({
            WarehouseProductID: warehouseQuery[item].WarehouseProductID,
            Product: (await Products.query().findById(warehouseQuery[item].ProductID)),
            Qty: warehouseQuery[item].QTY,
            Location: warehouseQuery[item].Location,
            Warehouse: warehouseQuery,
          })
        }
        return reply
      } else {
        throw new ForbiddenError(
          'Authentication token is invalid, please log in'
        )
      }
    },

    getWarehouseWithProduct: async (parent, arg, ctx, info) => {
      if (ctx.auth) {
        // Check if product exists
        productQuery = await Products.query().findById(arg.ProductID)
        if (!(productQuery instanceof Products)) {
          throw new UserInputError(
            'Product does not exist', { invalidArgs: Object.keys(arg) }
          )
        }
        warehouseProductsQuery = await WarehouseProducts.query().where('ProductID', arg.ProductID)
        reply = [] // Holds item for reply
        for (const item in warehouseQuery) {
          reply.push({
            WarehouseProductID: warehouseQuery[item].WarehouseProductID,
            Product: productQuery,
            Qty: warehouseQuery[item].QTY,
            Location: warehouseQuery[item].Location,
            Warehouse: (await Warehouse.query().findById(warehouseQuery[item].WarehouseID)),
          })
        }
        return reply
      } else {
        throw new ForbiddenError(
          'Authentication token is invalid, please log in'
        )
      }
    },
  },
  Mutation: {
    updateQTYofWarehouseProduct: async (parent, arg, ctx, info) => {
      if (ctx.auth) {
        warehouseProductsQuery = await WarehouseProducts.query().where('ProductID', arg.ProductID).where('WarehouseID', arg.WarehouseID)
        if (warehouseQuery.length !== 1) {
          throw new UserInputError(
            'Product does not exist or More then one entry for product', { invalidArgs: Object.keys(arg) }
          )
        }
        warehouseProductsUpdate = await Warehouse.query().patchAndFetchById(warehouseProductsQuery[0].WarehouseProductID, {
          QTY: arg.Qty
        })
        return {
          WarehouseProductID: warehouseProductsUpdate.WarehouseProductID,
          Product: (await Products.query().findById(warehouseProductsUpdate.ProductID)),
          Qty: warehouseProductsUpdate.QTY,
          Location: warehouseProductsUpdate.Location,
          Warehouse: (await Warehouse.query().findById(warehouseProductsUpdate.WarehouseID)),
        }
      } else {
        throw new ForbiddenError(
          'Authentication token is invalid, please log in'
        )
      }
    }
  },
};

module.exports = {
  Warehouse: typeDefs,
  WarehouseResolvers: resolvers,
}