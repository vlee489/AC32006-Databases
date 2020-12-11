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
    "Get the current used logged in using current Token"
    loginStaff: Staff
  }

  input newStaff{
    FirstName: String! @constraint(minLength: 1, maxLength: 45)
    LastName: String! @constraint(minLength: 1, maxLength: 45)
    PhoneNumber: String! @constraint(maxLength: 12)
    NINumber: String! @constraint(minLength: 9, maxLength: 9)
    Address: String!
    Wage: Float!
    Position: Int! @constraint(min: 1, max: 3)
    Email: String! @constraint(minLength: 5, format: "email", maxLength: 45)
    Password: String!
  }

  extend type Mutation{
    "Add a new staff member"
    addStaff(
      Staff: newStaff!
    ): Staff
  }
`;

// Resolvers define the technique for fetching the types defined in the Schema above
const resolvers = {
  Query: {
    getStaff: async (parent, arg, ctx, info) => {
      if (ctx.auth) {
        dbQuery = await Staff.query();

        return await dbQuery;
      } else {
        throw new ForbiddenError(
          'Authentication token is invalid, please log in'
        )
      }
    },
    loginStaff: async (parent, arg, ctx, info) => {
      if (ctx.auth) {
        dbQuery = await Staff.query().findOne({ 'StaffID': ctx.user.ID });

        return await dbQuery;
      } else {
        throw new ForbiddenError(
          'Authentication token is invalid, please log in'
        )
      }
    }
  },

  Mutation: {
    addStaff: async (parent, arg, ctx, info) => {
      if (ctx.auth == false || ctx.user.Position > 2) {
        throw new ForbiddenError(
          'Authentication token is invalid, please log in'
        )
      }
      const hashPass = await bcrypt.hash(arg.Staff.Password, 12)
      if (hashPass) {
        const newStaff = await Staff.query().insertAndFetch(
          {
            FirstName: arg.Staff.FirstName,
            LastName: arg.Staff.LastName,
            PhoneNumber: arg.Staff.PhoneNumber,
            NINumber: arg.Staff.NINumber,
            Address: arg.Staff.Address,
            Wage: arg.Staff.Wage,
            Position: arg.Staff.Position,
            Email: arg.Staff.Email,
            Password: hashPass
          }
        )
        return newStaff
      }
    },

  },
};

module.exports = {
  Staff: typeDefs,
  StaffResolvers: resolvers,
}