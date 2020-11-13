// Main file to runs everything
const { ApolloServer } = require('apollo-server');
const schema = require('./schema');

// The ApoclloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  introspection: true,
  playground: true,
  schema: schema,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});