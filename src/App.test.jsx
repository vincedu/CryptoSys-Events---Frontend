import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import { EventList } from './scenes';
import { App } from './App';

describe('App', () => {
    it('renders without crashing', () => {
        shallow(<App />);
    });

    it('renders EventList', () => {
        const wrapper = shallow(<App />);
        const eventList = <Route exact path="/" component={EventList} />;
        expect(wrapper.contains(eventList)).toEqual(true);
    });
});
