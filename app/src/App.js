import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css";
import Login from "./components/login";
import Register from "./components/register";
import User from "./components/user";

const handler = {
  // display: "flex",
  // width: "100%",
  // height: "100vh"
  // backgroundColor: "#F0F8FF",
};
export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={handler}>
          <Router>
            <Route exact component={Login} path="/" />
            <Route component={Register} path="/register" />
            <Route component={User} path="/user" />
          </Router>
        </div>
      </React.Fragment>
    );
  }
}
