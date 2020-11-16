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

    static get relationMappings() {
        return{
            product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Products,
                join: {
                  from: 'Inventory.ProductID',
                  to: 'Products.ProductID'
                }
              }
            }
        }
}

module.exports = {
    Inventory
  };