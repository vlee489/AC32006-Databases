// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');
const bcrypt = require('bcrypt');

class BranchStaff extends Model{
    // States table name
    static get tableName() {
        return 'BranchStaff';
    }

    // Set id column
    static get idColumn() {
        // last of columns as it's a composite key
        return ['BranchID', 'StaffID'];
    }

    static get relationMappings() {
        return {
          staff: {
            relation: Model.BelongsToOneRelation,
            modelClass: Staff,
            join: {
              from: 'BranchStaff.StaffID',
              to: 'Staff.StaffID'
            }
          }
        }
      }

}

module.exports = {
    BranchStaff
  };