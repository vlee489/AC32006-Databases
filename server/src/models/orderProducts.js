// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class OrderProducts extends Model{
    // States table name
    static get tableName() {
        return 'OrderProducts';
    }

    // Set id column
    static get idColumn() {
        return 'OrderProductsID';
    }

    static relationMappings = {
        products: {
          relation: Model.HasManyRelation,
          modelClass: Products,
          join:{
            from: 'Products.ProductID',
            to: 'OrderProducts.ProductID'
          }
        }
      }
}

module.exports = {
    OrderProducts
  };