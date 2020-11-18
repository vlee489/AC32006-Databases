import { withApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const graphqlClient = new ApolloClient({
    ssrMode: typeof window === "undefined",
    uri: "http://168.119.243.209:4000/graphql",
    cache: new InMemoryCache()
});

export const withGraphql = withApollo(graphqlClient);

const loginClient = new ApolloClient({
    ssrMode: typeof window === "undefined",
    uri: "http://168.119.243.209:4000/login",
    cache: new InMemoryCache()
});

export const withLogin = withApollo(loginClient);

export default withGraphql;
