/*
Defines all the Scheme for Shifts related GraphQL functions
*/
const { gql } = require('apollo-server-express');
const { Model } = require('objection');
const db = require('../db')
const { Shifts } = require('../models/shifts')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  "Represents A shift's details"
  type Shift{
      ShiftID: ID
      Start: String
      End: String
      Branch ID: Int
     
  }

  extend type Query{
      getShifts: [Shift]
  }
`;


const resolvers = {
  Query: {
    getShifts: async (parent, arg, ctx, info) => {
      dbQuery = Shifts.query();

      
      return await dbQuery;
    },
  },
};

module.exports = {
  Shifts: typeDefs,
  ShiftResolvers: resolvers,
}