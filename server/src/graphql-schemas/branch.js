/*
Defines all the Scheme for Store related GraphQL functions
*/
const { gql } = require('apollo-server-express');
const { Branch } = require('../models/branch');
const { BranchStaff } = require('../models/branchStaff');
const { Staff } = require('../models/staff');

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

  type StaffBranch{
      Staff: Staff
      Branch: Branch
  }

  extend type Query{
      "Get branches"
      getBranches(Region: String, BranchID: ID): [Branch]

      "Get the staff who work at a branch"
      getBranchStaff(BranchID: ID!): [Staff]
  }

  extend type Mutation{
      "Assign staff member to a branch"
      assignStaffToBranch(
          BranchID: ID!
          StaffID: ID!
      ): StaffBranch

      "Remove staff member from Branch"
      removeStaffFromBranch(
        BranchID: ID!
        StaffID: ID!
      ): Staff
    
  }
`;

const resolvers = {
    Query: {
        getBranches: async (parent, arg, ctx, info) => {
            dbQuery = Branch.query()
            if ('Region' in arg) {
                dbQuery = dbQuery.where('Region', arg.Region)
            }
            if ('BranchID' in arg) {
                dbQuery = dbQuery.where('BranchID', arg.BranchID)
            }
            return await dbQuery;
        },

        getBranchStaff: async (parent, arg, ctx, info) => {
            if (ctx.auth) {
                branchQuery = await Branch.query().findById(arg.BranchID)
                if (!(branchQuery instanceof Branch)) {
                    throw new UserInputError(
                        'Branch does not exist', { invalidArgs: Object.keys(arg) }
                    )
                }
                branchStaffQuery = await BranchStaff.query().where('BranchID', arg.BranchID)
                reply = []
                for (const item in branchStaffQuery) {
                    reply.push(await Staff.query().findById(branchStaffQuery[item].StaffID))
                }
                return reply
            } else {
                throw new ForbiddenError(
                    'Authentication token is invalid, please log in'
                )
            }
        }
    },
    Mutation: {
        assignStaffToBranch: async (parent, arg, ctx, info) => {
            if (ctx.auth) {
                // Check if Branch and Staff exist
                branchQuery = await Branch.query().findById(arg.BranchID)
                if (!(branchQuery instanceof Branch)) {
                    throw new UserInputError(
                        'Branch does not exist', { invalidArgs: Object.keys(arg) }
                    )
                }
                staffQuery = await Staff.query().findById(arg.StaffID)
                if (!(staffQuery instanceof Staff)) {
                    throw new UserInputError(
                        'Staff does not exist', { invalidArgs: Object.keys(arg) }
                    )
                }
                // Check permission levels
                if (staffQuery.Position < ctx.user.Position) {
                    throw new ForbiddenError(
                        'Can not add staff to branch staff member at a high position'
                    )
                }
                if ((staffQuery.Position == ctx.user.Position) && (staffQuery.StaffID != ctx.user.ID)) {
                    throw new ForbiddenError(
                        'Can not add staff to branch staff member at same level'
                    )
                }
                //Check staff isn't assigned to branch already
                branchStaffQuery = await BranchStaff.query().findById([arg.BranchID, arg.StaffID])
                if (branchStaffQuery instanceof BranchStaff) {
                    throw new UserInputError(
                        'Staff already memeber of Branch'
                    )
                }
                branchStaffInsert = await BranchStaff.query().insert({
                    BranchID: arg.BranchID,
                    StaffID: arg.StaffID
                })
                // Check if insert was successful
                if (branchStaffInsert instanceof BranchStaff) {
                    return {
                        Branch: branchQuery,
                        Staff: staffQuery
                    }
                } else {
                    throw new Error(
                        "Internal error assigning Staff to Branch"
                    )
                }
            } else {
                throw new ForbiddenError(
                    'Authentication token is invalid, please log in'
                )
            }
        },

        removeStaffFromBranch: async (parent, arg, ctx, info) => {
            if (ctx.auth) {
                // Check if Branch and Staff exist
                branchQuery = await Branch.query().findById(arg.BranchID)
                if (!(branchQuery instanceof Branch)) {
                    throw new UserInputError(
                        'Branch does not exist', { invalidArgs: Object.keys(arg) }
                    )
                }
                staffQuery = await Staff.query().findById(arg.StaffID)
                if (!(staffQuery instanceof Staff)) {
                    throw new UserInputError(
                        'Staff does not exist', { invalidArgs: Object.keys(arg) }
                    )
                }
                // Check permission levels
                if (staffQuery.Position < ctx.user.Position) {
                    throw new ForbiddenError(
                        'Can not remove staff from branch for staff member at a high position'
                    )
                }
                if ((staffQuery.Position == ctx.user.Position) && (staffQuery.StaffID != ctx.user.ID)) {
                    throw new ForbiddenError(
                        'Can not remove staff from branch for staff member at same level'
                    )
                }
                // Check if staff is member of branch
                branchStaffQuery = await BranchStaff.query().findById([arg.BranchID, arg.StaffID])
                if (!(branchStaffQuery instanceof BranchStaff)) {
                    throw new UserInputError(
                        'Staff is not a member of this Branch'
                    )
                }
                branchStaffDelete = await BranchStaff.query().deleteById([arg.BranchID, arg.StaffID])
                if(branchStaffDelete){
                    return staffQuery
                }else{
                    throw new Error(
                        'Internal Error remove staff member from branch'
                    )
                }

            } else {
                throw new ForbiddenError(
                    'Authentication token is invalid, please log in'
                )
            }
        }
    }
}

module.exports = {
    Branches: typeDefs,
    BranchResolvers: resolvers
}
