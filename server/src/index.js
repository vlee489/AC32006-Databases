// Main file to runs everything
const { ApolloServer } = require('apollo-server');
const schema = require('./schema');

// The Apollo Server constructor, takes in Schema from Schema Builder and other prams
const server = new ApolloServer({
  introspection: true,
  playground: true,
  schema: schema,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});