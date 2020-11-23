import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import { AuthenticatedRoute } from '@components';
import { HelpCenter, EventCreation, MainPage, SignIn } from '../scenes';
import App from '../App';

describe('App', () => {
    it('renders without crashing', () => {
        shallow(<App />);
    });

    it('renders MainPage', () => {
        const wrapper = shallow(<App />);
        const mainPage = <Route exact path="/" component={MainPage} />;
        expect(wrapper.contains(mainPage)).toEqual(true);
    });

    it('renders SignIn', () => {
        const wrapper = shallow(<App />);
        const eventList = <Route exact path="/signIn" component={SignIn} />;
        expect(wrapper.contains(eventList)).toEqual(true);
    });

    it('renders helpCenter', () => {
        const wrapper = shallow(<App />);
        const eventList = <Route exact path="/helpCenter" component={HelpCenter} />;
        expect(wrapper.contains(eventList)).toEqual(true);
    });

    it('renders eventCreation', () => {
        const wrapper = shallow(<App />);
        const eventList = <AuthenticatedRoute path="/createEvent" component={EventCreation} />;
        expect(wrapper.contains(eventList)).toEqual(true);
    });
});
