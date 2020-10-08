import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

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

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true,
        },
    ],
};

const SignIn = () => {
    return (
        <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
};
export default SignIn;
