// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class ProductMaterials extends Model{
    // States table name
    static get tableName() {
        return 'ProductMaterials';
    }
    // Set id column
    static get idColumn() {
        return 'ProductMaterialID';
    }
}

module.exports = {
    ProductMaterials
  };