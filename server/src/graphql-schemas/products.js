/*
Defines all the Scheme for Product related GraphQL functions
*/
const { gql } = require('apollo-server-express');
const { Products } = require('../models/products');
const { getStorageItem } = require('../func/storageHelper');
const { ProductMaterials } = require('../models/productMaterials');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  "Represents A product's details"
  type Product{
      ProductID: ID
      Name: String
      Category: Int
      Price: Float
      Description: String
      Weight: Float
      Colour: String
      Dimensions: String
  }

  "The instance of materials that make up a product"
  type ProductMaterials{
    Storage: Storage
    Qty: Int
  }

  "Parts that make up a product"
  type ProductComponents{
    Product: Product
    Components: [ProductMaterials]
  }

  extend type Query{
    "Get a list of products"
    getProducts(ProductID: ID, Category: Int): [Product]
    "Get a list of products in a list of catergories"
    getProductsFromCatergories(Category: [Int]!): [Product]
    "Get the materials used for a product"
    getProductMaterials(ProductID: ID!): ProductComponents
  }
`;

// Resolvers define the technique for fetching the types defined in the Schema above
const resolvers = {
  Query: {
    getProducts: async (parent, arg, ctx, info) => {
      dbQuery = Products.query();
      if ('ProductID' in arg) {
        dbQuery = dbQuery.where('ProductID', arg.ProductID);
      }
      if ('Category' in arg) {
        dbQuery = dbQuery.where('Category', arg.Category);
      }
      return await dbQuery;
    },

    getProductsFromCatergories: async (parent, arg, ctx, info) => {
      reply = []
      for(const i in arg.Category){
        dbQuery = await Products.query().where('Category', arg.Category[i]);
        reply = reply.concat(dbQuery)
      }
      return reply
    },

    getProductMaterials: async (parent, arg, ctx, info) => {
      if (ctx.auth) {
        productQuery = await Products.query().findById(arg.ProductID);
        if(!(productQuery instanceof Products)){
          throw new IdError(`No Product with ProductID:${arg.ProductID}`)
        }
        // Get productMaterials
        productMaterialQuery = await ProductMaterials.query().where('ProductID', arg.ProductID)
        ProductMaterialsReply = []
        // For each item that makes up a product
        for(const i in productMaterialQuery){
          ProductMaterialsReply.push({
            Storage: (await getStorageItem(productMaterialQuery[i].StorageID)),
            Qty: productMaterialQuery[i].QTY
          })
        }
        return{
          Product: productQuery,
          Components: ProductMaterialsReply
        }
      } else {
        throw new ForbiddenError(
            'Authentication token is invalid, please log in'
        )
    }
    }
  },
};

module.exports = {
  Products: typeDefs,
  ProductResolvers: resolvers,
}
