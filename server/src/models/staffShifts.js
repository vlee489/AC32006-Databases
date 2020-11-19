// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class StaffShifts extends Model {
  // States table name
  static get tableName() {
    return 'StaffShifts';
  }

  // Set id column
  static get idColumn() {
    return ['ShiftID', 'StaffID'];
  }

  static get relationMappings() {
    return {
      shifts: {
        relation: Model.BelongsToOneRelation,
        modelClass: Shifts,
        join: {
          from: 'StaffShifts.ShiftID',
          to: 'Shifts.ShiftID'
        }
      }
    }
  }

}

module.exports = {
  StaffShifts
};