// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Orders extends Model{
    // States table name
    static get tableName() {
        return 'Orders';
    }
    // Set id column
    static get idColumn() {
        return 'OrderID';
    }
}

module.exports = {
    Orders
  };