// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class Branch extends Model{
    // States table name
    static get tableName() {
        return 'Branch';
    }
    // Set id column
    static get idColumn() {
        return 'BranchID';
    }
}

module.exports = {
    Branch
  };