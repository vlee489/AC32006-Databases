/*
Defines all the Scheme for Shifts related GraphQL functions
*/
const { gql, ForbiddenError, UserInputError } = require('apollo-server-express');
const { IdError } = require('../func/errors');
const { Branch } = require('../models/branch');
const { Shifts } = require('../models/shifts')
const { Staff } = require('../models/staff')
const { StaffShifts } = require('../models/staffShifts');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  "Represents A shift's details"
  type Shift{
      ShiftID: ID
      "Date/Time in ISO 8601"
      Start: String
      "Date/Time in ISO 8601"
      End: String
      StaffReq: Int
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

    "Get Shifts Staff is assigned to"
      shiftOfStaff(
        "id of staff memeber"
        StaffID:ID
        "Get shifts in the future only"
        Future: Boolean
      ): [Shift]

    "Get staff members in a shift"
      staffOnShift(
        "ID of shift"
        ShiftID: ID!
      ): [Staff]
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
          throw new IdError(
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
              StaffReq: ShiftQuery[item].StaffReq,
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

    shiftOfStaff: async (parent, arg, ctx, info) => {
      if (ctx.auth) {
        var staffID
        const now = new Date()
        // Get ID 
        if ('StaffID' in arg) {
          staffID = arg.StaffID
        } else {
          staffID = ctx.user.ID
        }
        staffShiftQuery = await StaffShifts.query().where('StaffID', staffID)
        reply = []
        for (const item in staffShiftQuery) {
          shiftQuery = Shifts.query().findById(staffShiftQuery[item].ShiftID)
          if ('Future' in arg) {
            shiftQuery = shiftQuery.where('Start', '>', now)
          }
          shiftQuery = await shiftQuery
          if (shiftQuery) {
            reply.push({
              ShiftID: shiftQuery.ShiftID,
              End: shiftQuery.End.toISOString(), // Turns date into ISO format
              Start: shiftQuery.Start.toISOString(),
              StaffReq: shiftQuery.StaffReq,
              Branch: (await Branch.query().findById(shiftQuery.BranchID))
            })
          }
        }
        return reply
      } else {
        throw new ForbiddenError(
          'Authentication token is invalid, please log in'
        )
      }
    },

    staffOnShift: async (parent, arg, ctx, info) => {
      if (ctx.auth) {
        // Check if ShiftID exists
        if (!(await Shifts.query().findById(arg.ShiftID))) {
          throw new IdError(
            'Shift does not exist', { invalidArgs: Object.keys(arg) }
          )
        }
        // Where for staff on shift
        reply = []  //List to hold staff on shift
        staffShiftQuery = await StaffShifts.query().where('ShiftID', arg.ShiftID)
        for (const item in staffShiftQuery) {
          reply.push((await Staff.query().findById(staffShiftQuery[item].StaffID)))
        }
        return reply
      } else {
        throw new ForbiddenError(
          'Authentication token is invalid, please log in'
        )
      }
    },
  },
  Mutation: {
    assignShift: async (parent, arg, ctx, info) => {
      if (ctx.auth) {
        // Gets staff from query
        if ('StaffID' in arg) {
          staffQuery = await Staff.query().findById(arg.StaffID)
          // We check if the Staff member isn't in a high or same position of the 
          // person issuing the shift assignement, if they are throw an error
          if (staffQuery.Position < ctx.user.Position) {
            throw new ForbiddenError(
              'Can not assign shift for staff member at a high position'
            )
          }
          if ((staffQuery.Position == ctx.user.Position) && (staffQuery.StaffID != ctx.user.ID)) {
            throw new ForbiddenError(
              'Can not assign shift for staff member at same level'
            )
          }
        } else {
          staffQuery = await Staff.query().findById(ctx.user.ID)
        }
        shiftQuery = await Shifts.query().findById(arg.ShiftID)
        // Check if both staff and shift exist
        if (!(shiftQuery instanceof Shifts) || !(staffQuery instanceof Staff)) {
          throw new IdError(
            'Shift or Staff does not exist', { invalidArgs: Object.keys(arg) }
          )
        }
        // Checks if the staff member has been assigned to shift already
        if ((await StaffShifts.query().findById([shiftQuery.ShiftID, staffQuery.StaffID])) instanceof StaffShifts) {
          throw new UserInputError(
            'Staff assigned to Shift already'
          )
        }
        // Assign staff to shift
        const assignShift = await StaffShifts.query().insert({
          ShiftID: shiftQuery.ShiftID,
          StaffID: staffQuery.StaffID
        })


        if (assignShift instanceof StaffShifts) {
          return {
            ShiftID: shiftQuery.ShiftID,
            Start: shiftQuery.Start.toISOString(),
            End: shiftQuery.End.toISOString(),
            StaffReq: shiftQuery.StaffReq,
            Branch: (await Branch.query().findById(shiftQuery.BranchID))
          }
        }
        return null

      } else {
        throw new ForbiddenError(
          'Authentication token is invalid, please log in'
        )
      }
    }
  },
};

module.exports = {
  Shifts: typeDefs,
  ShiftResolvers: resolvers,
}