/*
Defines all the Scheme for Shifts related GraphQL functions
*/
const { gql, ForbiddenError, UserInputError } = require('apollo-server-express');
const { Branch } = require('../models/branch');
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
      "Branch the shift is taking place at"
      Branch: Branch 
  }

  extend type Query{
    "Get shifts available for a branch"
      getShifts(
        "Branch to get shifts for"
        BranchID: ID!,
        "Get shifts in the future only"
        Future: Boolean): [Shift]
  }

  extend type Mutation{
    "Assign staff to a shift. Returns the shift you've been assigned to."
    assignShift(
      "Shift to assign to"
      ShiftID: ID!,
      "Staff to assign to said shift. If not provided assigned the currently logged in user"
      StaffID:ID
      ): Shift
  }
`;
// We don't define Branch here as it's already defined in the branch scheme file.


const resolvers = {
  Query: {
    getShifts: async (parent, arg, ctx, info) => {
      //Check if user is authenticated
      if (ctx.auth) {
        // Tries to query for the branch, to see if it exists first
        BranchQuery = await Branch.query().where('BranchID', arg.BranchID);
        if (BranchQuery.length == 0) {
          // if branch doesn't exist throw an error
          throw new UserInputError(
            'BranchID does not exist', { invalidArgs: Object.keys(arg) }
          )
        }
        // Get the shifts for a branch
        ShiftQuery = Shifts.query().where('BranchID', arg.BranchID);

        // If Future exists in arg
        if ("Future" in arg) {
          const now = new Date();  // Gets current date/time
          ShiftQuery = ShiftQuery.where('Start', '>', now)  // Get all shifts after current datetime
        }

        ShiftQuery = await ShiftQuery

        var reply = []  // Holds item for reply
        // Builds the reply
        for (const item in ShiftQuery) {//For items in array
          // add an item to the reply with the fields
          reply.push(
            {
              ShiftID: ShiftQuery[item].ShiftID,
              End: (ShiftQuery[item].End).toISOString(), // Turns date into ISO format
              Start: (ShiftQuery[item].Start).toISOString(),
              Branch: BranchQuery[0] //As we only ever query shifts for a single branch, we can use the first item returned
            }
          )
        }
        return reply // return reply
      } else {
        throw new ForbiddenError(
          'Authentication token is invalid, please log in'
        )
      }
    },
  },
  Mutation: {
    assignShift: async (parent, arg, ctx, info) => {
        //To Be Implimented
    }
  },
};

module.exports = {
  Shifts: typeDefs,
  ShiftResolvers: resolvers,
}