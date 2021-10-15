import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getConnectionState, getUser } from '../../reducers/admin';

const ForbidenRoute = (props) => {
    const { path, component, ...other } = props;
    const isConnected = useSelector(getConnectionState);
    const user = useSelector(getUser);

    if (!isConnected) {
        return (
            <>
                <Route path={path} component={component} {...other} />
            </>
        );
    }

    return (
        <Redirect to={`/client/${user.username}`} />
    )
}

ForbidenRoute.propTypes = {
    path: PropTypes.string,
    component: PropTypes.any
}

export default ForbidenRoute;
