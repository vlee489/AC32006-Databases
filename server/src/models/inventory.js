// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Inventory extends Model{
    // States table name
    static get tableName() {
        return 'Inventory';
    }
    // Set id column
    static get idColumn() {
        return 'InventoryID';
    }

    static relationMappings = {
        materials: {
          relation: Model.HasManyRelation,
          modelClass: Products,
          join:{
            from: 'Products.ProductID',
            to: 'Inventory.ProductID'
          }
        }
      }
}

module.exports = {
    Inventory
  };