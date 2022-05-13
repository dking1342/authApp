import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../store/user';

const PrivateRoute = ({component: Component, ...rest}) => {
    const { state } = useContext(UserContext);    
    return (
        <Route {...rest} render={props => (
            state.userInfo ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;