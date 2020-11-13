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
}

module.exports = {
    MaterialsCatalogue
  };