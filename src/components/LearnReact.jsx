import React from 'react';
import logo from '../logo.svg';
import SetUser from './SetUser';
import Username from './Username';

function LearnReact() {
    return (
        <header className="App-header">
            <Username />
            <SetUser />
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.js</code> and save to reload!
            </p>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                Learn React
            </a>
        </header>
    );
}

export default LearnReact;
