import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { LoginPage } from '../../pages';

export default function ConnexionNavigation() {
    const { path } = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={path} component={LoginPage} />
            </Switch>
        </div>
    )
}
