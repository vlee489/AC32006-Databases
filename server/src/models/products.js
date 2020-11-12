// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Products extends Model{
    // States table name
    static get tableName() {
        return 'Products';
    }
    // Set id column
    static get idColumn() {
        return 'ProductID';
    }
}

module.exports = {
    Products
  };