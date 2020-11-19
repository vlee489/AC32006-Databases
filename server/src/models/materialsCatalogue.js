// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class MaterialsCatalogue extends Model{
    // States table name
    static get tableName() {
        return 'MaterialsCatalogue';
    }
    // Set id column
    static get idColumn() {
        return 'MaterialsCatalogueID';
    }
    static get relationMappings() {
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
        }
      }
}

module.exports = {
    MaterialsCatalogue
  };