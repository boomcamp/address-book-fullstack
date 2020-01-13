import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// import Registration from './components/Registration/Registration';
// import Login from './components/Login/Login';
// import Address_book from './components/AddressBook/Address_Book';
import Home from './components/Login/Home';

export default function Routes(){
    return(
        <div>
            <Switch>
                <Route component={Home} path='/' exact></Route>
                {/* <Route component={Login} path='/login'></Route> */}
                {/* <Route component={Registration} path='/registration'></Route> */}
                {/* <Route component={Address_book} path='/address-book'></Route> */}
            </Switch>
        </div>
    )
}