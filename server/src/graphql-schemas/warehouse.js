/*
Defines all the Scheme for Warehouse related GraphQL functions
*/
const { gql } = require('apollo-server-express');
const { Model } = require('objection');
const db = require('../db')
const { Warehouse } = require('../models/warehouse')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  "Represents A warehouse's details"
  type  Warehouse{
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

  extend type Query{
      getWarehouse(WarehouseID: ID, Address 1: String, Address 2: String, City: String, Region: String, Country: String, Postcode: String): [Warehouse]
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
    },
  };
module.exports = {
  Warehouse: typeDefs,
  WarehouseResolvers: resolvers,
}