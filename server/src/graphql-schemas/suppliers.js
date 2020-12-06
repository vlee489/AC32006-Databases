/*
Defines all the Scheme for Supplier related GraphQL functions
*/
const { gql, ForbiddenError, ValidationError } = require('apollo-server-express');
const { Suppliers } = require('../models/suppliers')

const PostcodeRegex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

  extend type Mutation{
    addSupplier(
      Name: String!
      Address1: String!
      Address2: String!
      City: String!
      Region: String!
      Country: String!
      Postcode: String!
      PhoneNumber: String!
      Email: String!
      Website: String!
    ): Supplier
  }
`;

// Resolvers define the technique for fetching the types defined in the Schema above
const resolvers = {
  Query: {
    getSuppliers: async (parent, arg, ctx, info) => {
      if (ctx.auth) {
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
      } else {
        throw new ForbiddenError(
          'Authentication token is invalid, please log in'
        )
      }
    },
  },
  Mutation:{
    addSupplier: async (parent, arg, ctx, info) => {
      if (ctx.auth) {
        // Check data is within range
        if(!(PostcodeRegex.test(arg.Postcode))){
          throw new ValidationError("Invalid Postcode")
        }
        if(((arg.PhoneNumber).length > 12) || (/\D/.test(arg.PhoneNumber))){
          throw new ValidationError("Invalid Phone number")
        }
        if(!EmailRegex.test(String(arg.Email).toLowerCase())){
          throw new ValidationError("Invalid EMail address")
        }
        supplierInsert = await Suppliers.query().insert({
          Name: arg.Name,
          Address1: arg.Address1,
          Address2: arg.Address2,
          City: arg.City,
          Region: arg.Region,
          Country: arg.Country,
          Postcode:arg.Postcode,
          PhoneNumber: arg.PhoneNumber,
          Email: arg.Email,
          Website: arg.Website,
        })
        return supplierInsert
      } else {
        throw new ForbiddenError(
          'Authentication token is invalid, please log in'
        )
      }
    },
  }
};

module.exports = {
  Suppliers: typeDefs,
  SupplierResolvers: resolvers,
}
