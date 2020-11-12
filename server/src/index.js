// Main file to runs everything
const { ApolloServer, gql } = require('apollo-server');
const { Model } = require('objection');
const db  = require('./db')
const { Products } = require('./models/products')

Model.knex(db);


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Product{
      ProductID: ID
      Name: String
      Catergory: Int
      Price: Float
      Description: String
      Weight: Float
      Colour: String
      Dimensions: String
  }

  type Query{
    getProducts(ProductID: ID, Catergory: Int): [Product]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getProducts: (parent, arg, ctx, info) => {
      dbQuery = Products.query();

      if ('ProductID' in arg){
        dbQuery = dbQuery.where('ProductID', arg.ProductID);
      }

      if ('Catergory' in arg){
        dbQuery = dbQuery.where('Catergory', arg.Catergory);
      }

      return dbQuery;
    },
  },
};

  // The ApoclloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});