// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Inventory extends Model {
  // States table name
  static get tableName() {
    return 'Inventory';
  }
  // Set id column
  static get idColumn() {
    return 'InventoryID';
  }

  static get relationMappings() {
    const { ProductPurchases } = require('./productPurchases');
    const { Products } = require('./products')
    const { Branch } = require('./branch')
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Products,
        join: {
          from: 'Inventory.ProductID',
          to: 'Products.ProductID'
        }
      },

      branch: {
        relation: Model.BelongsToOneRelation,
        modelClass: Branch,
        join: {
          from: 'Inventory.BranchID',
          to: 'Branch.BranchID'
        }
      },

      productPurchases: {
        relation: Model.HasManyRelation,
        modelClass: ProductPurchases,
        join: {
          from: 'Inventory.InventoryID',
          to: 'ProductPurchases.InventoryID'
        }
      },
    }
  }
}

module.exports = {
  Inventory
};