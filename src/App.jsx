import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import { NavBar } from './components';
import { HowItWorks, HelpCenter, EventCreation, EventList, SignIn } from './scenes';
import TicketCreation from './scenes/EventCreation/components/TicketCreation';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <NavBar />
                <Switch>
                    <Route exact path="/" component={EventList} />
                    <Route exact path="/signIn" component={SignIn} />
                    <Route exact path="/howItWorks" component={HowItWorks} />
                    <Route exact path="/helpCenter" component={HelpCenter} />
                    <Route exact path="/createTicket" component={TicketCreation} />
                    <Route exact path="/createEvent" component={EventCreation} />
                </Switch>
            </div>
        </ApolloProvider>
    );
}

export default App;
