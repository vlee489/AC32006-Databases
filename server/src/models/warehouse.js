// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Warehouse extends Model{
    // States table name
    static get tableName() {
        return 'Warehouse';
    }
    // Set id column
    static get idColumn() {
        return 'WarehouseID';
    }
}

module.exports = {
    Warehouse
  };