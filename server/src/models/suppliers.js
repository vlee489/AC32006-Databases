// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Suppliers extends Model {
    // States table name
    static get tableName() {
        return 'Suppliers';
    }
    // Set id column
    static get idColumn() {
        return 'SupplierID';
    }
    static get relationMappings() {
        const { SuppliersCatalogue } = require('./suppliersCatalogue');
        return {
            suppliersCatalogue: {
                relation: Model.HasManyRelation,
                modelClass: SuppliersCatalogue,
                join: {
                    from: 'Suppliers.SupplierID',
                    to: 'SuppliersCatalogue.SupplierID'
                }
            }
        }
    }
}

module.exports = {
    Suppliers
};