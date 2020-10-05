import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import HowItWorks from './components/help/HowItWorks';
import HelpCenter from './components/help/HelpCenter';
import TicketCreation from './scenes/EventCreation/TicketCreation/TicketCreation';
import EventCreation from './scenes/EventCreation/index';
import EventListContainer from './components/Event/EventListContainer';

function App() {
    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route exact path="/" component={EventListContainer} />
                <Route exact path="/signIn" component={SignIn} />
                <Route exact path="/howItWorks" component={HowItWorks} />
                <Route exact path="/helpCenter" component={HelpCenter} />
                <Route exact path="/createTicket" component={TicketCreation} />
                <Route exact path="/createEvent" component={EventCreation} />
            </Switch>
        </div>
    );
}

export default App;
