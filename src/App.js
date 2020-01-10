import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact component={Login} path="/" />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
