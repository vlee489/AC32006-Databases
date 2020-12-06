// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

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
        const { Suppliers } = require('../models/suppliers')
        const { MaterialsCatalogue } = require('../models/materialsCatalogue')
        return {
            suppliers: {
                relation: Model.BelongsToOneRelation,
                modelClass: Suppliers,
                join: {
                    from: 'SuppliersCatalogue.SupplierID',
                    to: 'Suppliers.SupplierID'
                }
            },
            materials: {
                relation: Model.BelongsToOneRelation,
                modelClass: MaterialsCatalogue,
                join: {
                    from: 'SuppliersCatalogue.MaterialID',
                    to: 'MaterialsCatalogue.MaterialID'
                }
            }
        }
    }

}

module.exports = {
    SuppliersCatalogue
};