// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');

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

    static get relationMappings() {
      const { ProductMaterials } = require('./productMaterials'); // We import here to avoid doing a circular import in Node V14
      return{
        productMaterials: {
          relation: Model.HasManyRelation, // Each product can be in many relations
          modelClass: ProductMaterials,  // Class that has the model we're refering to
          join: {
            from: 'Products.ProductID',
            to: 'ProductMaterials.ProductID'
            }
        }
      }
  }

}

module.exports = {
    Products
  };