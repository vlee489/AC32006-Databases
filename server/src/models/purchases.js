// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Purchases extends Model {
    // States table name
    static get tableName() {
        return 'Purchases';
    }
    // Set id column
    static get idColumn() {
        return 'PurchaseID';
    }
    static get relationMappings() {
        const { ProductPurchases } = require('./productPurchases');
        return {
          productPurchases: {
            relation: Model.HasManyRelation, // Each product can be in many relations
            modelClass: ProductPurchases,  // Class that has the model we're refering to
            join: {
              from: 'Purchases.PurchaseID',
              to: 'ProductPurchases.PurchaseID'
            }
          }
        }
      }
}

module.exports = {
    Purchases
};