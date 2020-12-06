// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class MaterialsCatalogue extends Model {
  // States table name
  static get tableName() {
    return 'MaterialsCatalogue';
  }
  // Set id column
  static get idColumn() {
    return 'MaterialID';
  }
  static get relationMappings() {
    const { SuppliersCatalogue } = require('./suppliersCatalogue');
    const { Storage } = require('../models/storage');
    return {
      // This is a one to one relationship \/
      storage: {
        relation: Model.BelongsToOneRelation,
        modelClass: Storage,
        join: {
          from: 'MaterialsCatalogue.MaterialID',
          to: 'Storage.MaterialID'
        }
      },
      supplierCatalogue: {
        relation: Model.HasManyRelation,
        modelClass: SuppliersCatalogue,
        join: {
          from: 'MaterialsCatalogue.MaterialID',
          to: 'SuppliersCatalogue.MaterialID'
        }
      },
    }
  }
}

module.exports = {
  MaterialsCatalogue
};