import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import AddressBook from './components/AddressBook/AddressBook';
import Home from './components/Login/Home';
export default function Routes(){
    return(
        <Switch>
            <Route component={Home} path='/' exact></Route>
            <Route component={Login} path='/login'></Route>
            <Route component={Registration} path='/registration'></Route>
            <Route component={AddressBook} path='/addressbook'></Route>
        </Switch>
    )
}