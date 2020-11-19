import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    HowItWorks,
    HelpCenter,
    EventCreation,
    EventList,
    SignIn,
    AccountSetup,
    PostAuth,
    EventPage,
    UserProfile,
} from '@scenes';
import { NavBar, AuthenticatedRoute, Footer } from '@components';
import { TicketCreation } from '@scenes/EventCreation/components/TicketCreation';
import { Confirm } from '@scenes/EventCreation/components/Confirm';
import SearchPage from '@scenes/SearchPage';
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
                        <Route path="/event" component={EventPage} />
                        <Route exact path="/signIn" component={SignIn} />
                        <Route exact path="/howItWorks" component={HowItWorks} />
                        <Route exact path="/helpCenter" component={HelpCenter} />
                        <Route exact path="/createTicket" component={TicketCreation} />
                        <Route exact path="/confirm" component={Confirm} />
                        <Route path="/search" component={SearchPage} />
                        <AuthenticatedRoute path="/createEvent" component={EventCreation} />
                        <AuthenticatedRoute exact path="/setupAccount" component={AccountSetup} />
                        <AuthenticatedRoute exact path="/postAuth" component={PostAuth} />
                        <AuthenticatedRoute path="/userProfile" component={UserProfile} />
                    </Switch>
                    <Footer />
                </NFTProvider>
            </AuthProvider>
        </div>
    );
};

export default App;
