// https://vincit.github.io/objection.js/guide/models.html
const { Model } = require('objection');
const warehouseProducts = require('./warehouseProducts');

class Products extends Model {
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
        Catergory: { type: 'integer' },
        Price: { type: 'number' },
        Description: { type: 'string', minLength: 1, maxLength: 2000 },
        Weight: { type: 'number' },
        Colour: { type: 'string', minLength: 0, maxLength: 45 },
        Dimensions: { type: 'string', minLength: 0, maxLength: 12 },
      }
    };
  }

  static get relationMappings() {
    // We import here to avoid doing a circular import in Node V14
    // These are for the class/ORM that a relation of Products
    const { ProductMaterials } = require('./productMaterials');
    const { Inventory } = require('./inventory');
    const { OrderProducts } = require('./orderProducts');
    const { WarehouseProducts } = require('./warehouseProducts');
    return {
      productMaterials: {
        relation: Model.HasManyRelation, // Each product can be in many relations
        modelClass: ProductMaterials,  // Class that has the model we're refering to
        join: {
          from: 'Products.ProductID',
          to: 'ProductMaterials.ProductID'
        }
      },
      inventory: {
        relation: Model.HasManyRelation, // Each product can be in many relations
        modelClass: Inventory,  // Class that has the model we're refering to
        join: {
          from: 'Products.ProductID',
          to: 'Inventory.ProductID'
        }
      },
      orderProducts: {
        relation: Model.HasManyRelation, // Each product can be in many relations
        modelClass: OrderProducts,  // Class that has the model we're refering to
        join: {
          from: 'Products.ProductID',
          to: 'OrderProducts.ProductID'
        }
      },
      warehouseProducts: {
        relation: Model.HasManyRelation, // Each product can be in many relations
        modelClass: WarehouseProducts,  // Class that has the model we're refering to
        join: {
          from: 'Products.ProductID',
          to: 'WarehouseProducts'
        }
      }
    }
  }

}

module.exports = {
  Products
};