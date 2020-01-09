import React, { Component } from "react";
import { Router } from "react-router-dom";
import "antd/dist/antd.css";
// import "./App.css";
import Register from "./components/register";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Register />
      </React.Fragment>
      // <Route>

      // </Route>
    );
  }
}
