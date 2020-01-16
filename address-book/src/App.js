import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import './App.css';

// COMPONENTS
import Login from './components/registerLogin/Login'
import Signup from './components/registerLogin/Signup'
import Dashboard from './components/Dashboard'
import Group from './components/Group/Group'
import MyAccount from './components/MyAccount'

function App() {
    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/account" component={MyAccount}/>
                    <Route exact path="/group" component={Group}/>
                </Switch>
            </BrowserRouter>
        </SnackbarProvider>
    );
}

export default App;