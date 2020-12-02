/*
Defines all the Scheme for Supplier related GraphQL functions
*/
const { gql } = require('apollo-server-express');
const { Suppliers } = require('../models/suppliers')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  "Represents A supplier's details"
  type Supplier{
    SupplierID: ID
    Name: String
    Address1: String
    Address2: String
    City: String
    Region: String
    Country: String
    Postcode: String
    PhoneNumber: String
    Email: String
    Website: String
  }

  extend type Query{
    "Get a list of suppliers"
    getSuppliers(SupplierID: ID, Category: Int): [Supplier]
  }
`;

// Resolvers define the technique for fetching the types defined in the Schema above
const resolvers = {
  Query: {
    getSuppliers: async (parent, arg, ctx, info) => {
      dbQuery = Suppliers.query();

      if ('SupplierID' in arg) {
        dbQuery = dbQuery.where('SupplierID', arg.SupplierID);
      }

      if ('Name' in arg) {
        dbQuery = dbQuery.where('Name', arg.Name);
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

      if ('PhoneNumber' in arg) {
        dbQuery = dbQuery.where('PhoneNumber', arg.PhoneNumber);
      }

      if ('Email' in arg) {
        dbQuery = dbQuery.where('Email', arg.Email);
      }

      if ('Website' in arg) {
        dbQuery = dbQuery.where('Website', arg.Website);
      }

      return await dbQuery;
    },
  },
};

module.exports = {
  Suppliers: typeDefs,
  SupplierResolvers: resolvers,
}
