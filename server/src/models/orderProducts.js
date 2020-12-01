// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class OrderProducts extends Model {
  // States table name
  static get tableName() {
    return 'OrderProducts';
  }

  // Set id column
  static get idColumn() {
    return 'OrderProductsID';
  }

  static get relationMappings() {
    const { Orders } = require('../models/orders');
    const { Products } = require('../models/products');
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Products,
        join: {
          from: 'OrderProducts.ProductID',
          to: 'Products.ProductID'
        }
      },
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Orders,
        join: {
          from: 'OrderProducts.OrderID',
          to: 'Orders.OrderID'
        }
      }
    }
  }
}

module.exports = {
  OrderProducts
};