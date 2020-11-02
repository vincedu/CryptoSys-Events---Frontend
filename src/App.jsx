import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HowItWorks, HelpCenter, EventCreation, EventList, SignIn, AccountSetup, PostAuth, UserProfile } from '@scenes';
import { NavBar, AuthenticatedRoute } from '@components';
import { TicketCreation } from '@scenes/EventCreation/components/TicketCreation';
import { AuthProvider, NFTProvider } from '@providers';
import { EventPage } from './scenes/EventPage/EventPage';

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
                        <Route path="/event" component={EventPage} />
                        <Route path="/search" component={HowItWorks} />
                        <Route path="/location" component={HowItWorks} />
                        <Route path="/date" component={HowItWorks} />
                        <AuthenticatedRoute path="/createEvent" component={EventCreation} />
                        <AuthenticatedRoute exact path="/setupAccount" component={AccountSetup} />
                        <AuthenticatedRoute exact path="/postAuth" component={PostAuth} />
                        <AuthenticatedRoute exact path="/userProfile" component={UserProfile} />
                    </Switch>
                </NFTProvider>
            </AuthProvider>
        </div>
    );
};

export default App;
