import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '@providers';

const SETUP_ACCOUNT_ROUTE = '/setupAccount';
const SIGN_IN_ROUTE = '/signIn';

const AuthenticatedRoute = (props) => {
    const { component, ...routeProps } = props;
    const { isUserSignedIn, isUserDataConfigured } = useContext(AuthContext);
    const RouteComponent = component;
    RouteComponent.displayName = component.displayName;

    return (
        <Route
            {...routeProps}
            render={(componentProps) => {
                if (isUserSignedIn) {
                    if (isUserDataConfigured || routeProps.path === SETUP_ACCOUNT_ROUTE) {
                        return <RouteComponent {...componentProps} />;
                    }

                    return <Redirect to={SETUP_ACCOUNT_ROUTE} />;
                }
                return <Redirect to={SIGN_IN_ROUTE} />;
            }}
        />
    );
};

AuthenticatedRoute.propTypes = Route.propTypes;

export default AuthenticatedRoute;
