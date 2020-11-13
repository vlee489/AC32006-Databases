// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');
const { Products } = require('./products');

class ProductMaterials extends Model{
    // States table name
    static get tableName() {
        return 'ProductMaterials';
    }
    
    // Set id column
    static get idColumn() {
        return 'ProductMaterialID';
    }

    static relationMappings = {
        products: {
          relation: Model.HasManyRelation,
          modelClass: Products,
          join:{
            from: 'Products.ProductID',
            to: 'ProductMaterials.ProductID'
          }
        }
      }
}

module.exports = {
    ProductMaterials
  };