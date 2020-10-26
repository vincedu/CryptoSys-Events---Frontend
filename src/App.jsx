import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import './App.css';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { NavBar } from './components';
import { TicketCreation } from './scenes/EventCreation/components/TicketCreation';
import { HowItWorks, HelpCenter, EventCreation, EventList, SignIn, EventPage } from './scenes';

const API_URI = 'http://localhost:4000/graphql';

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

const client = new ApolloClient({
    link: authLink.concat(httpLink),
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

const App = () => {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <NavBar />
                <Switch>
                    <Route exact path="/" component={EventList} />
                    <Route path="/event" component={EventPage} />
                    <Route path="/search" component={HowItWorks} />
                    <Route path="/location" component={HowItWorks} />
                    <Route path="/date" component={HowItWorks} />
                    <Route exact path="/signIn" component={SignIn} />
                    <Route exact path="/howItWorks" component={HowItWorks} />
                    <Route exact path="/helpCenter" component={HelpCenter} />
                    <Route exact path="/createTicket" component={TicketCreation} />
                    <Route exact path="/createEvent" component={EventCreation} />
                </Switch>
            </div>
        </ApolloProvider>
    );
};

export default App;
