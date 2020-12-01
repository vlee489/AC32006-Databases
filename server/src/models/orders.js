// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Orders extends Model {
  // States table name
  static get tableName() {
    return 'Orders';
  }
  // Set id column
  static get idColumn() {
    return 'OrderID';
  }
  static get relationMappings() {
    // We import here to avoid doing a circular import in Node V14
    // These are for the class/ORM that a relation of Products
    const { OrderProducts } = require('./orderProducts');
    const { Warehouse } = require('../models/warehouse');
    const { Branch } = require('../models/branch');
    return {
      orderProducts: {
        relation: Model.HasManyRelation, // Each product can be in many relations
        modelClass: OrderProducts,  // Class that has the model we're refering to
        join: {
          from: 'Orders.OrderID',
          to: 'OrderProducts.OrderID'
        }
      },
      warehouse: {
        relation: Model.BelongsToOneRelation,
        modelClass: Warehouse,
        join: {
          from: 'Orders.WarehouseID',
          to: 'Warehouse.WarehouseID'
        }
      },
      branch: {
        relation: Model.BelongsToOneRelation, // Each product can be in many relations
        modelClass: Branch,  // Class that has the model we're refering to
        join: {
          from: 'Orders.BranchID',
          to: 'Branch.BranchID'
        }
      }
    }
  }
}

module.exports = {
  Orders
};