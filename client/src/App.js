import React from "react";
import { HashRouter } from "react-router-dom";
import axios from "axios";
import Routes from "./routes.js";
import { message } from "antd";
import "antd/dist/antd.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      sort: "asc"
    };
  }

  myhandleChange = (value, check) => {
    check === "first_name"
      ? this.setState({ first_name: value })
      : check === "last_name"
      ? this.setState({ last_name: value })
      : check === "username"
      ? this.setState({ username: value })
      : check === "email"
      ? this.setState({ email: value })
      : check === "password"
      ? this.setState({ password: value })
      : this.state.password === value && this.state.password !== ""
      ? this.setState({ passconfirm: false })
      : this.setState({ passconfirm: true });
  };

  componentDidMount() {
    this.setState({ token: localStorage.getItem("user") });
  }

  myhandleLogin = e => {
    e.preventDefault();
    const input = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("http://localhost:4005/login", input)
      .then(response => {
        if (response.data.error) {
          message.error(response.data.error);
        } else {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("userId", response.data.id);
          this.setState({ token: localStorage.getItem("user") });
        }
      })
      .catch(err => {
        console.log(err);
        try {
          message.error(err.response.data.error);
        } catch {
          console.log(err);
        }
      });
  };

  myhandleSignup = e => {
    e.preventDefault();
    const inputs = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("http://localhost:4005/register", inputs)
      .then(() => {})
      .catch(err => {
        console.log(err);
        try {
          message.error(err.response.data.error);
        } catch {
          console.log(err);
        }
      });
  };

  myhandleLogout = () => {
    localStorage.clear();
    this.setState({ token: "", username: "", password: "" });
    message.success("Successfully logout", 1);
  };

  handleSuccess = () => {
    this.setState({ success: false });
  };

  handleSort = event => {
    this.setState(event.target.value);
  };

  render() {
    return (
      <HashRouter>
        <Routes
          myhandleChange={this.myhandleChange}
          myhandleLogout={this.myhandleLogout}
          myhandleLogin={this.myhandleLogin}
          myhandleSignup={this.myhandleSignup}
          handleSuccess={this.handleSuccess}
          success={this.state.success}
          token={this.state.token}
          passconfirm={this.state.passconfirm}
          handleSort={this.handleSort}
        />
      </HashRouter>
    );
  }
}
