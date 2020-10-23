import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HowItWorks, HelpCenter, EventCreation, EventList, SignIn, AccountSetup, PostAuth } from '@scenes';
import { NavBar, AuthenticatedRoute } from '@components';
import { TicketCreation } from '@scenes/EventCreation/components/TicketCreation';
import { AuthProvider, NFTProvider } from '@providers';

import './App.css';

const App = () => {
    return (
        <div className="App">
            <AuthProvider>
                <NFTProvider>
                    <NavBar />
                    <Switch>
                        <Route exact path="/" component={EventList} />
                        <Route exact path="/signIn" component={SignIn} />
                        <Route exact path="/howItWorks" component={HowItWorks} />
                        <Route exact path="/helpCenter" component={HelpCenter} />
                        <Route exact path="/createTicket" component={TicketCreation} />
                        <AuthenticatedRoute path="/createEvent" component={EventCreation} />
                        <AuthenticatedRoute exact path="/setupAccount" component={AccountSetup} />
                        <AuthenticatedRoute exact path="/postAuth" component={PostAuth} />
                    </Switch>
                </NFTProvider>
            </AuthProvider>
        </div>
    );
};

export default App;
