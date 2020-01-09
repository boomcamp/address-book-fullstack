import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Register from './components/Register';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/register" component={Register} />
        </Switch>
    )
}