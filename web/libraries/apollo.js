import { withApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    uri: "http://168.119.243.209:4000/graphql",
    cache: new InMemoryCache()
});

export default withApollo(client);
