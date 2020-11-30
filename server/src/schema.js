/*
https://www.apollographql.com/blog/modularizing-your-graphql-schema-code-d7f71d5ed5f2/
Schema Builder
*/
const { makeExecutableSchema, gql } = require("apollo-server-express");
const { merge } = require("lodash");

// Seperate Schema Files
const { Products, ProductResolvers } = require('./graphql-schemas/products')
const { Staff, StaffResolvers } = require('./graphql-schemas/staff');
const { Branches, BranchResolvers } = require('./graphql-schemas/branch')
const { Shifts, ShiftResolvers } = require('./graphql-schemas/shifts');
const { Warehouse, WarehouseResolvers } = require('./graphql-schemas/warehouse');
const { Inventory, InventoryResolvers } = require('./graphql-schemas/inventory');
const { Purchase,PurchaseResolvers } = require('./graphql-schemas/purchase')

// These empty Query an Mutations give a base to build off of for extending
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
    Shifts,
    Warehouse,
    Branches,
    Inventory,
    Purchase
  ],
  resolvers: merge(
    resolvers,
    ProductResolvers,
    StaffResolvers,
    ShiftResolvers,
    WarehouseResolvers,
    BranchResolvers,
    InventoryResolvers,
    PurchaseResolvers
  ),
});

// Export as module 
module.exports = schema;