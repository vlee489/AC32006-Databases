// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Suppliers extends Model{
    // States table name
    static get tableName() {
        return 'Suppliers';
    }
    // Set id column
    static get idColumn() {
        return 'SupplierID';
    }
}

module.exports = {
    Suppliers
  };