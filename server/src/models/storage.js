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
        return {
          productMaterials: {
            relation: Model.HasManyRelation,
            modelClass: ProductMaterials,
            join: {
              from: 'Storage.StorageID',
              to: 'ProductMaterials.StorageID'
            }
          },
        }
      }
}

module.exports = {
    Storage
  };