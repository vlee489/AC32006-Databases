import { withApollo } from "next-apollo";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

const httpLink = createHttpLink({
    uri: "http://168.119.243.209:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
    const cookies = Cookies.get();
    let userToken = "";
    try {
        userToken = JSON.parse(cookies.userToken)
    } catch (error) {}

    return {
        headers: {
            ...headers,
            Authorization: userToken.token ? userToken.token : "",
        }
    }
});

const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default withApollo(client);
