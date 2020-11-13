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
}

module.exports = {
    WarehouseProducts
  };