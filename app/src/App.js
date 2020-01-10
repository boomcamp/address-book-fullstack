import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css";
import Login from "./components/login";
import Register from "./components/register";
import Main from "./components/main";

const handler = {
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  width: "100%",
  height: "100vh",
  backgroundColor: "#F0F8FF",
  padding: "8%"
};
export default class App extends Component {
  render() {
    return (
      <div style={handler}>
        <Router>
          <Route exact component={Login} path="/" />
          <Route component={Register} path="/register" />
          <Route component={Main} path="/main" />
        </Router>
      </div>
    );
  }
}
