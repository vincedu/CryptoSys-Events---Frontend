import React, { useContext } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '@providers';
import { PageContainer } from '@components/';

// Configure Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyD2zenXWuTOLc5IPD918k4vJK3dWjNwZvs',
    authDomain: 'eosio-8f13d.firebaseapp.com',
    databaseURL: 'https://eosio-8f13d.firebaseio.com',
    projectId: 'eosio-8f13d',
    storageBucket: 'eosio-8f13d.appspot.com',
    messagingSenderId: '945061729690',
    appId: '1:945061729690:web:10ab6440f2c37e216d9623',
};

firebase.initializeApp(firebaseConfig);

const SignIn = () => {
    const history = useHistory();
    const { resetAuthStatusReported } = useContext(AuthContext);

    // Configure FirebaseUI.
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: false,
            },
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => {
                resetAuthStatusReported();
                history.push('/postAuth');
                return false;
            },
        },
    };

    return (
        <PageContainer>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </PageContainer>
    );
};
export default SignIn;
