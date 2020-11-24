/*
Defines all the Scheme for Store related GraphQL functions
*/
const { gql } = require('apollo-server-express');
const { Model } = require('objection');
const { Branch } = require('../models/branch')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  "Represents A Branch's details"
  type Branch{
    BranchID: ID
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
      getBranches(Region: String, BranchID: ID): [Branch]
  }
`;

const resolvers = {
    Query: {
        getBranches: async (parent, arg, ctx, info) => {
            dbQuery = Branch.query()

            if('Region' in arg){
                dbQuery = dbQuery.where('Region', arg.Region)
            }

            if('BranchID' in arg){
                dbQuery = dbQuery.where('BranchID', arg.BranchID)
            }

            return await dbQuery;
        }
    }
}

module.exports = {
    Branches: typeDefs,
    BranchResolvers: resolvers
}
