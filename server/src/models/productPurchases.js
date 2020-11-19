// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class ProductPurchases extends Model{
    // States table name
    static get tableName() {
        return 'ProductPurchases';
    }

    // Set id column
    static get idColumn() {
        return ['InventoryID', 'PurchaseID'];
    }

    static get relationMappings() {
        return {
          inventory:{
            relation: Model.BelongsToOneRelation,
            modelClass: Inventory,
            join:{
              from: 'ProductPurchases.InventoryID',
              to: 'Inventory.InventoryID'
            }
          },
        }
      }

}

module.exports = {
  ProductPurchases
  };