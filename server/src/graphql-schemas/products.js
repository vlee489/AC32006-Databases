/*
Defines all the Scheme for Product related GraphQL functions
*/
const { gql } = require('apollo-server-express');
const { Products } = require('../models/products')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  "Represents A product's details"
  type Product{
      ProductID: ID
      Name: String
      Category: Int
      Price: Float
      Description: String
      Weight: Float
      Colour: String
      Dimensions: String
  }

  extend type Query{
    "Get a list of products"
    getProducts(ProductID: ID, Category: Int): [Product]
    "Get a list of products in a list of catergories"
    getProductsFromCatergories(Category: [Int]!): [Product]
  }
`;

// Resolvers define the technique for fetching the types defined in the Schema above
const resolvers = {
  Query: {
    getProducts: async (parent, arg, ctx, info) => {
      dbQuery = Products.query();

      if ('ProductID' in arg) {
        dbQuery = dbQuery.where('ProductID', arg.ProductID);
      }

      if ('Category' in arg) {
        dbQuery = dbQuery.where('Category', arg.Category);
      }

      return await dbQuery;
    },

    getProductsFromCatergories: async (parent, arg, ctx, info) => {
      reply = []
      for(const i in arg.Category){
        dbQuery = await Products.query().where('Category', arg.Category[i]);
        reply = reply.concat(dbQuery)
      }
      return reply
    }
  },
};

module.exports = {
  Products: typeDefs,
  ProductResolvers: resolvers,
}
