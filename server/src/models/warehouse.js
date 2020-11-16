// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Warehouse extends Model {
    // States table name
    static get tableName() {
        return 'Warehouse';
    }
    // Set id column
    static get idColumn() {
        return 'WarehouseID';
    }
    static get relationMappings() {
        // We import here to avoid doing a circular import in Node V14
        // These are for the class/ORM that a relation of Products
        const { Orders } = require('./orders');
        return {
            Order: {
                relation: Model.HasManyRelation, // Each product can be in many relations
                modelClass: Orders,  // Class that has the model we're refering to
                join: {
                    from: 'Warehouse.WarehouseID',
                    to: 'Orders.WarehouseID'
                }
            },
        }
    }
}

module.exports = {
    Warehouse
};