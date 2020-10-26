import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '@providers';

const PostAuth = () => {
    const { isUserDataConfigured } = useContext(AuthContext);

    if (isUserDataConfigured) {
        return <Redirect to="/" />;
    }

    return <Redirect to="/setupAccount" />;
};

export default PostAuth;
