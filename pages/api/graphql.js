const { ApolloServer, gql } = require('apollo-server-micro');


//Defines the GraphQL scheme
const typeDefs = gql`
  type Query {
    sayHello: String
  }
`;

// A map of functions which return data for the schema.
// https://www.apollographql.com/docs/apollo-server/schema/schema/#schema-definition-language
const resolvers = {
    Query: {
      sayHello(parent, args, context) {
        return 'Hello World!';
      },
    },
};

// creates the Apollo/GraphQl server with typeDefs and resovles
const apolloServer = new ApolloServer({typeDefs, resolvers});

// Creates handler
const handler = apolloServer.createHandler({path: "/api/graphql"});

// Tells next.js not to bodyparse anything
export const config = {
    api:{
        bodyParser: false
    }
};

// Sets default to be our handler
export default handler;