import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Register from './components/Register';
import AddressBook from './components/AddressBook';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/register" component={Register} />
            <Route path="/addressbook" component={AddressBook} />
        </Switch>
    )
}