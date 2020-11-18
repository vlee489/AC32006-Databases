/*
Defines all the Scheme for staff related GraphQL functions
*/
const { gql, AuthenticationError, ForbiddenError } = require('apollo-server-express');
const { Model } = require('objection');
const db = require('../db')
const { Staff } = require('../models/staff')
const bcrypt = require('bcrypt');

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

  extend type Mutation{
    "Add a new staff member"
    addStaff(
      FirstName: String
      LastName: String
      PhoneNumber: String
      NINumber: String
      Address: String
      Wage: Float
      Position: Int
      Email: String
      Password: String
    ): Staff
  }
`;

// Resolvers define the technique for fetching the types defined in the Schema above
const resolvers = {
  Query: {
    getStaff: (parent, arg, ctx, info) => {
      if (ctx.auth) {
        dbQuery = Staff.query();

        return dbQuery;
      } else {
        throw new ForbiddenError(
          'Authentication token is invalid, please log in'
        )
      }
    },
  },
  Mutation: {

    addStaff: async (parent, arg, ctx, info) => {
      if (ctx.auth == false || ctx.Position > 2) {
        throw new ForbiddenError(
          'Authentication token is invalid, please log in'
        )
      }
      const hashPass = await bcrypt.hash(arg.Password, 12)
      if(hashPass){
        console.log(hashPass)

        const newStaff = await Staff.query().insertAndFetch(
          {
            FirstName: arg.FirstName,
            LastName: arg.LastName,
            PhoneNumber: arg.PhoneNumber,
            NINumber: arg.NINumber,
            Address: arg.Address,
            Wage: arg.Wage,
            Position: arg.Position,
            Email: arg.Email,
            Password: hashPass
          }
        )
        return newStaff
      }
    }

  },
};

module.exports = {
  Staff: typeDefs,
  StaffResolvers: resolvers,
}