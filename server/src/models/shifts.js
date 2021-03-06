// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Shifts extends Model {
  // States table name
  static get tableName() {
    return 'Shifts';
  }
  // Set id column
  static get idColumn() {
    return 'ShiftID';
  }

  static get relationMappings() {
    const { StaffShifts } = require('./staffShifts');
    const { Branch } = require('./branch');
    return {
      staffShifts: {
        relation: Model.HasManyRelation, // Each product can be in many relations
        modelClass: StaffShifts,  // Class that has the model we're refering to
        join: {
          from: 'Shifts.ShiftID',
          to: 'StaffShifts.ShiftID'
        }
      },
      branch: {
        relation: Model.BelongsToOneRelation,
        modelClass: Branch,
        join: {
          from: 'Shifts.BranchID',
          to: 'Branch.BranchID'
        }
      },
    }
  }

}

module.exports = {
  Shifts
};
