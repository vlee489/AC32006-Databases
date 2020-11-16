// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Shift extends Model{
    // States table name
    static get tableName() {
        return 'Shift';
    }
    // Set id column
    static get idColumn() {
        return 'ShiftID';
    }
            modelClass: StaffShifts,  // Class that has the model we're refering to
}

module.exports = {
    Shift
  };