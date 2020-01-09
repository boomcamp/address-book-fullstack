import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom';

import Login from "./components/Login/Login";

class Routes extends Component {
  render() { 
    return (  
      <Switch>
        <Route exact component={Login} path="/" />
      </Switch>
    );
  }
}
 
export default Routes;