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
    EventModification,
    Unauthorized,
} from '@scenes';
import { NavBar, AuthenticatedRoute, Footer } from '@components';
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
                        <Route path="/event/:id" component={EventPage} />
                        <Route exact path="/signIn" component={SignIn} />
                        <Route exact path="/howItWorks" component={HowItWorks} />
                        <Route exact path="/helpCenter" component={HelpCenter} />
                        <Route path="/search" component={HowItWorks} />
                        <Route path="/location" component={HowItWorks} />
                        <Route path="/date" component={HowItWorks} />
                        <Route path="/unauthorized" component={Unauthorized} />
                        <AuthenticatedRoute path="/createEvent" component={EventCreation} />
                        <AuthenticatedRoute exact path="/setupAccount" component={AccountSetup} />
                        <AuthenticatedRoute exact path="/postAuth" component={PostAuth} />
                        <AuthenticatedRoute path="/userProfile" component={UserProfile} />
                        <AuthenticatedRoute path="/modifyEvent/:eventId" component={EventModification} />
                    </Switch>
                    <Footer />
                </NFTProvider>
            </AuthProvider>
        </div>
    );
};

export default App;
