// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Branch extends Model {
  // States table name
  static get tableName() {
    return 'Branch';
  }
  // Set id column
  static get idColumn() {
    return 'BranchID';
  }
  static get relationMappings() {
    // We import here to avoid doing a circular import in Node V14
    // These are for the class/ORM that a relation of Products
    const { Orders } = require('./orders');
    const { Inventory } = require('./inventory');
    const { Shifts } = require('./shifts');
    const { BranchStaff } = require('./branchStaff');
    return {
      orders: {
        relation: Model.HasManyRelation, // Each product can be in many relations
        modelClass: Orders,  // Class that has the model we're refering to
        join: {
          from: 'Branch.BranchID',
          to: 'Orders.BranchID'
        }
      },
      inventory: {
        relation: Model.HasManyRelation, // Each product can be in many relations
        modelClass: Inventory,  // Class that has the model we're refering to
        join: {
          from: 'Branch.BranchID',
          to: 'Inventory.BranchID'
        }
      },
      shifts: {
        relation: Model.HasManyRelation,
        modelClass: Shifts,
        join: {
          from: 'Branch.BranchID',
          to: 'Shifts.BranchID'
        }
      },
      branchStaff: {
        relation: Model.HasManyRelation,
        modelClass: BranchStaff,
        join: {
          from: 'Branch.BranchID',
          to: 'BranchStaff.BranchID'
        }
      }
    }
  }
}

module.exports = {
  Branch
};
