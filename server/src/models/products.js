// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');
const { Inventory } = require('./inventory');
const { ProductMaterials } = require('./productMaterials');

class Products extends Model{
    // States table name
    static get tableName() {
        return 'Products';
    }
    // Set id column
    static get idColumn() {
        return 'ProductID';
    }

    // used for input validation.
    static get jsonSchema() {
        return {
          type: 'object',
    
          properties: {
            ProductID: { type: 'integer' },
            Name: { type: 'string', minLength: 1, maxLength: 255 },
            Catergory: {type: 'integer'},
            Price: {type: 'number'},
            Description: { type: 'string', minLength: 1, maxLength: 2000 },
            Weight: { type: 'number' },
            Colour: { type: 'string', minLength: 0, maxLength: 45 },
            Dimensions: { type: 'string', minLength: 0, maxLength: 12 },
          }
        };
    }

    static relationMappings = {
      materials: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductMaterials,
        join:{
          from: 'ProductMaterials.ProductID',
          to: 'Products.ProductID'
        }
      },
      inventory: {
        relation: Model.BelongsToOneRelation,
        modelClass: Inventory,
        join:{
          from: 'Inventory.ProductID',
          to: 'Products.ProductID'
        }
      }
    }
}

module.exports = {
    Products
  };