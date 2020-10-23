import React from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { ApolloClient, ApolloConsumer } from '@apollo/client';
import { USER_DATA_QUERY } from '@graphql/queries';
import { CenteredCircularProgress } from '@components';

const defaultAuthContext = {
    isAuthStatusReported: false,
    isUserSignedIn: false,
    isUserDataConfigured: false,
    userData: undefined,
    setUserData: () => {},
    resetAuthStatusReported: () => {},
    unsubscribeFromFirebase: () => {},
};

export const AuthContext = React.createContext(defaultAuthContext);

class AuthProviderWithoutClient extends React.Component {
    constructor() {
        super();
        this.state = defaultAuthContext;
    }

    componentDidMount() {
        const unsubscribeFromFirebase = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken()
                    .then((idToken) => {
                        localStorage.setItem('token', idToken);
                        this.props.apolloClient
                            .query({ query: USER_DATA_QUERY })
                            .then((result) => {
                                this.setState({
                                    isAuthStatusReported: true,
                                    isUserSignedIn: true,
                                    isUserDataConfigured: !!result && !!result.data && !!result.data.userData,
                                    userData: result.data.userData,
                                });
                            })
                            .catch(() => {
                                this.setState({
                                    isAuthStatusReported: true,
                                    isUserSignedIn: false,
                                    isUserDataConfigured: false,
                                    userData: undefined,
                                });
                            });
                    })
                    .catch(() => {
                        this.setState({
                            isAuthStatusReported: true,
                            isUserSignedIn: false,
                            isUserDataConfigured: false,
                            userData: undefined,
                        });
                    });
            } else {
                this.setState({
                    isAuthStatusReported: true,
                    isUserSignedIn: false,
                    isUserDataConfigured: false,
                    userData: undefined,
                });
                localStorage.removeItem('token');
            }
        });

        this.setState({
            setUserData: (userData) => {
                this.setState({ userData, isUserDataConfigured: true });
            },
            unsubscribeFromFirebase,
            resetAuthStatusReported: () => {
                this.setState({ isAuthStatusReported: false });
            },
        });
    }

    componentWillUnmount() {
        this.state.unsubscribeFromFirebase();
    }

    render() {
        const { children } = this.props;
        const {
            isAuthStatusReported,
            isUserSignedIn,
            isUserDataConfigured,
            userData,
            setUserData,
            resetAuthStatusReported,
        } = this.state;

        return (
            <AuthContext.Provider
                value={{
                    isUserSignedIn,
                    isAuthStatusReported,
                    isUserDataConfigured,
                    userData,
                    setUserData,
                    resetAuthStatusReported,
                }}
            >
                {isAuthStatusReported ? children : <CenteredCircularProgress />}
            </AuthContext.Provider>
        );
    }
}

AuthProviderWithoutClient.propTypes = {
    children: PropTypes.node.isRequired,
    apolloClient: PropTypes.instanceOf(ApolloClient).isRequired,
};

const AuthProvider = (props) => {
    return (
        <ApolloConsumer>{(client) => <AuthProviderWithoutClient {...props} apolloClient={client} />}</ApolloConsumer>
    );
};

export default AuthProvider;
