// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Staff extends Model {
  // States table name
  static get tableName() {
    return 'Staff';
  }

  // Set id column
  static get idColumn() {
    return 'StaffID';
  }

  static get relationMappings() {
    const { BranchStaff } = require('./branchStaff');
    return {
      branchStaff: {
        relation: Model.HasManyRelation,
        modelClass: BranchStaff,
        join: {
          from: 'Staff.StaffID',
          to: 'BranchStaff.StaffID'
        }
      }
    }
  }
}

module.exports = {
  Staff
};