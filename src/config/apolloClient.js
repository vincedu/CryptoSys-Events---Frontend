import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { RestLink } from 'apollo-link-rest';

const isProductionEnv = process.env.NODE_ENV === 'production';

const API_URI = isProductionEnv
    ? 'https://eosevent-57928065.us-east-2.elb.amazonaws.com:4000/graphql'
    : 'http://localhost:4000/graphql';

const restLink = new RestLink({
    uri: 'https://us-central1-eosio-8f13d.cloudfunctions.net/api',
});

const httpLink = createUploadLink({
    uri: API_URI,
});

const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    // TODO: move token from localStorage to a safer place in production env
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const apolloClient = new ApolloClient({
    link: ApolloLink.from([authLink, restLink, httpLink]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    eventsByParam: offsetLimitPagination(['category']),
                },
            },
        },
    }),
    uri: API_URI,
});

export default apolloClient;
