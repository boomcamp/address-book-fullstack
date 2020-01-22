import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css";
import Login from "./components/login";
import Register from "./components/register";
import User from "./components/user";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Route exact component={Login} path="/" />
          <Route component={Register} path="/register" />
          <Route component={User} path="/user" />
        </Router>
      </React.Fragment>
    );
  }
}
