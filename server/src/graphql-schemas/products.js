/*
Defines all the Scheme for Product related GraphQL functions
*/
const { gql } = require('apollo-server');
const { Model } = require('objection');
const db  = require('../db')
const { Products } = require('../models/products')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Product{
      ProductID: ID
      Name: String
      Catergory: Int
      Price: Float
      Description: String
      Weight: Float
      Colour: String
      Dimensions: String
  }

  extend type Query{
    getProducts(ProductID: ID, Catergory: Int): [Product]
  }
`;

// Resolvers define the technique for fetching the types defined in the Schema above
const resolvers = {
  Query: {
    getProducts: (parent, arg, ctx, info) => {
      dbQuery = Products.query();

      if ('ProductID' in arg){
        dbQuery = dbQuery.where('ProductID', arg.ProductID);
      }

      if ('Catergory' in arg){
        dbQuery = dbQuery.where('Catergory', arg.Catergory);
      }

      return dbQuery;
    },
  },
};

module.exports = {
    Products: typeDefs,
    ProductResolvers: resolvers,
}
