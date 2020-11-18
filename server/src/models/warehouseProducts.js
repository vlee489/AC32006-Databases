// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class WarehouseProducts extends Model{
    // States table name
    static get tableName() {
        return 'WarehouseProducts';
    }

    // Set id column
    static get idColumn() {
        return 'WarehouseProductID';
    }

    static get relationMappings() {
        return{
            product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Products,
                join: {
                  from: 'WarehouseProducts.ProductID',
                  to: 'Products.ProductID'
                }
              }
            }
        }
}

module.exports = {
    WarehouseProducts
  };