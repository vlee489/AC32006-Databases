// Main file to runs everything
const { ApolloServer, gql } = require('apollo-server');
const { Products, ProductResolvers} = require('./graphql-schemas/products')

// Defines the consts the define the typeDefs an Resolvers
typeDefs = [Products]
resolvers = [ProductResolvers]

// The ApoclloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});