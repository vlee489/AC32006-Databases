// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Storage extends Model{
    // States table name
    static get tableName() {
        return 'Storage';
    }
    // Set id column
    static get idColumn() {
        return 'StorageID';
    }
    static get relationMappings() {
        const { ProductMaterials } = require('./productMaterials');
        const { MaterialsCatalogue } = require('./materialsCatalogue');
        return {
          productMaterials: {
            relation: Model.HasManyRelation,
            modelClass: ProductMaterials,
            join: {
              from: 'Storage.StorageID',
              to: 'ProductMaterials.StorageID'
            }
          },
          // This is a one to one relationship \/
          materialsCatalogue: {
            relation: Model.BelongsToOneRelation,
            modelClass: MaterialsCatalogue,
            join: {
              from: 'Storage.MaterialID',
              to: 'MaterialsCatalogue.MaterialID'
            }
          },
        }
      }
}

module.exports = {
    Storage
  };