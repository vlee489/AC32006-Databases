// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

class ProductMaterials extends Model {
  // States table name
  static get tableName() {
    return 'ProductMaterials';
  }

  // Set id column
  static get idColumn() {
    return 'ProductMaterialID';
  }

  static get relationMappings() {
    return {
      product: {
        relation: Model.BelongsToOneRelation, // Each entry has a relation to one entry in the other table
        modelClass: Products, // Class that has the model we're refering to
        join: {
          from: 'ProductMaterials.ProductID',
          to: 'Products.ProductID'
        }
      },
      storage: {
        relation: Model.BelongsToOneRelation,
        modelClass: Storage,
        join: {
          from: 'ProductMaterials.StorageID',
          to: 'Storage.StorageID'
        }
      },
    }
  }
}

module.exports = {
  ProductMaterials
};