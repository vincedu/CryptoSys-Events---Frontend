import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/client';
import { UALProvider } from 'ual-reactjs-renderer';

import apolloClient from './config/apolloClient';
import { chains, authenticators, APP_NAME } from './config/ual';
import theme from './theme';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.css';
import './i18n';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <ApolloProvider client={apolloClient}>
                        <UALProvider chains={chains} authenticators={authenticators} appName={APP_NAME}>
                            <App />
                        </UALProvider>
                    </ApolloProvider>
                </Router>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
