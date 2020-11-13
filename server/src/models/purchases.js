// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Purchases extends Model{
    // States table name
    static get tableName() {
        return 'Purchases';
    }
    // Set id column
    static get idColumn() {
        return 'PurchaseID';
    }
}

module.exports = {
    Purchases
  };