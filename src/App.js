import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact component={Login} path="/" />
        {/* <Route exact component={(checkSessionToken()) ? Dashboard : Login} path="/" /> */}
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
