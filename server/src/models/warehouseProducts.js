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

    static relationMappings = {
        products: {
          relation: Model.HasManyRelation,
          modelClass: Products,
          join:{
            from: 'Products.ProductID',
            to: 'WarehouseProducts.ProductID'
          }
        }
      }
}

module.exports = {
    WarehouseProducts
  };