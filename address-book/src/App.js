import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import './App.css';

// COMPONENTS
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'

function App() {
    return (
        <SnackbarProvider maxSnack={3}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                </Switch>
            </BrowserRouter>
        </SnackbarProvider>
    );
}

export default App;