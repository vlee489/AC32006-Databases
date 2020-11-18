/*
Defines all the Scheme for staff related GraphQL functions
*/
const { gql, AuthenticationError, ForbiddenError } = require('apollo-server-express');
const { Model } = require('objection');
const db  = require('../db')
const { Staff } = require('../models/staff')

// Querry must extend as it's adding on to the main one
const typeDefs = gql`
  "Represents a member of staff"
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
    "Get List of Staff"
    getStaff(StaffID: Int, Position: Int): [Staff]
  }
`;

// Resolvers define the technique for fetching the types defined in the Schema above
const resolvers = {
    Query: {
      getStaff: (parent, arg, ctx, info) => {
        if (ctx.auth){
          dbQuery = Staff.query();
  
          return dbQuery;
        }else{
          throw new ForbiddenError(
            'Authentication token is invalid, please log in'
        )
        }
      },
    },
  };
  
  module.exports = {
      Staff: typeDefs,
      StaffResolvers: resolvers,
  }