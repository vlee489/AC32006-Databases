// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');
const { Suppliers } = require('./suppliers');

class SuppliersCatalogue extends Model {
    // States table name
    static get tableName() {
        return 'SuppliersCatalogue';
    }

    // Set id column
    static get idColumn() {
        // last of columns as it's a composite key
        return ['SupplierID', 'SupplierID'];
    }

    static get relationMappings() {
        return {
            suppliers: {
                relation: Model.BelongsToOneRelation,
                modelClass: Suppliers,
                join: {
                    from: 'SuppliersCatalogue.SupplierID',
                    to: 'Suppliers.SupplierID'
                }
            }
        }
    }

}

module.exports = {
    SuppliersCatalogue
};