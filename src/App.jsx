import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './App.css';
import { createUploadLink } from 'apollo-upload-client';
import { NavBar } from './components';
import { HowItWorks, HelpCenter, EventCreation, EventList, SignIn } from './scenes';

const API_URI = 'http://localhost:4000/graphql';

const httpLink = createUploadLink({
    uri: API_URI,
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    uri: API_URI,
});

function App() {
    return (
        <Router>
            <ApolloProvider client={client}>
                <div className="App">
                    <NavBar />
                    <Switch>
                        <Route exact path="/" component={EventList} />
                        <Route exact path="/signIn" component={SignIn} />
                        <Route exact path="/howItWorks" component={HowItWorks} />
                        <Route exact path="/helpCenter" component={HelpCenter} />
                        <Route path="/createEvent" component={EventCreation} />
                    </Switch>
                </div>
            </ApolloProvider>
        </Router>
    );
}

export default App;
