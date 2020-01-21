import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Register from './components/Register';
import AddressBook from './components/AddressBook';
import Profile from './components/AddressBookUsers/Profile';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/register" component={Register} />
            <Route path="/addressbook" component={AddressBook} />
            <Route path="/profile" component={Profile} />
            <Route path="*" component={() => '404 NOT FOUND'} />
        </Switch>
    )
}