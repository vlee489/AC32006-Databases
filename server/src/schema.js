/*
https://www.apollographql.com/blog/modularizing-your-graphql-schema-code-d7f71d5ed5f2/
Schema Builder
*/
const { makeExecutableSchema, gql } = require("apollo-server");
const { merge } = require("lodash");

// Seperate Schema Files
const { Products, ProductResolvers } = require('./graphql-schemas/products')
const { Staff, StaffResolvers } = require('./graphql-schemas/staff');
const staff = require("./models/staff");

const Query = gql`
  type Query {
    _empty: String
  }
`;

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

const resolvers = {};

// Build Scheme with each file
const schema = makeExecutableSchema({
  typeDefs: [
    Query,
    Mutation,
    Products,
    Staff,
  ],
  resolvers: merge(
    resolvers,
    ProductResolvers,
    StaffResolvers
  ),
});

// Export as module 
module.exports = schema;