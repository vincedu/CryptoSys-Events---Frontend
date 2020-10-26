import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import { HowItWorks, HelpCenter, EventCreation, EventList, SignIn } from '../scenes';
import App from '../App';

describe('App', () => {
    it('renders without crashing', () => {
        shallow(<App />);
    });

    it('renders EventList', () => {
        const wrapper = shallow(<App />);
        const eventList = <Route exact path="/" component={EventList} />;
        expect(wrapper.contains(eventList)).toEqual(true);
    });

    it('renders SignIn', () => {
        const wrapper = shallow(<App />);
        const eventList = <Route exact path="/signIn" component={SignIn} />;
        expect(wrapper.contains(eventList)).toEqual(true);
    });

    it('renders howitWorks', () => {
        const wrapper = shallow(<App />);
        const eventList = <Route exact path="/howItWorks" component={HowItWorks} />;
        expect(wrapper.contains(eventList)).toEqual(true);
    });

    it('renders helpCenter', () => {
        const wrapper = shallow(<App />);
        const eventList = <Route exact path="/helpCenter" component={HelpCenter} />;
        expect(wrapper.contains(eventList)).toEqual(true);
    });

    it('renders eventCreation', () => {
        const wrapper = shallow(<App />);
        const eventList = <Route path="/createEvent" component={EventCreation} />;
        expect(wrapper.contains(eventList)).toEqual(true);
    });
});
