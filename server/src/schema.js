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
const { Order, InternalOrderResolvers } = require('./graphql-schemas/order')

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

const SharedTypes = gql`
  "Represents a entry of product ordered in a Purchase"
  type OrderItem{
      Product: Product
      Qty: Int
  }
  "Product and Qty required for an order"
    input ProductOrder{
        ProductID: ID,
        Qty: Int
    } 
`;

// Build Scheme with each file
const schema = makeExecutableSchema({
  typeDefs: [
    Query,
    SharedTypes,
    Mutation,
    Products,
    Staff,
    Shifts,
    Warehouse,
    Branches,
    Inventory,
    Purchase,
    Order,
  ],
  resolvers: merge(
    resolvers,
    ProductResolvers,
    StaffResolvers,
    ShiftResolvers,
    WarehouseResolvers,
    BranchResolvers,
    InventoryResolvers,
    PurchaseResolvers,
    InternalOrderResolvers
  ),
});

// Export as module 
module.exports = schema;