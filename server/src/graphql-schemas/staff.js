/*
Defines all the Scheme for staff related GraphQL functions
*/
const { gql } = require('apollo-server');
const { Model } = require('objection');
const db  = require('../db')
const { Staff } = require('../models/staff')

// Querry must extend as it's adding on to the main one
const typeDefs = gql`
  type Staff{
      StaffID: ID
      FirstName: String
      LastName: String
      PhoneNumber: String
      NINumber: String
      Address: String
      Wage: Float
      Position: Int
      Email: String
  }

  extend type Query{
    getStaff(StaffID: Int): [Staff]
  }
`;

// Resolvers define the technique for fetching the types defined in the Schema above
const resolvers = {
    Query: {
      getStaff: (parent, arg, ctx, info) => {
        dbQuery = Staff.query();
  
        return dbQuery;
      },
    },
  };
  
  module.exports = {
      Staff: typeDefs,
      StaffResolvers: resolvers,
  }