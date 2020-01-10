import React from "react";
import axios from "axios";
import "./App.css";
import { HashRouter } from "react-router-dom";

import Routes from "./components/Routes/Routes";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      accessToken: null,
      error: false,
      redirect: false,
      disabled: false
    };
  }

  myEmailHandler = email => {
    this.setState({ email: email });
  };

  myPasswordHandler = password => {
    this.setState({ password: password });
  };

  confirmPasswordHandler = confirmPassword => {
    if (this.state.password !== confirmPassword) {
      this.setState({
        error: true
      });
      console.log("Password do not match!");
    } else {
      this.setState({
        error: false
      });
      alert("Password match!");
    }
  };

  myUsernameHandler = username => {
    this.setState({ username: username });
  };

  mySubmitHandler = e => {
    e.preventDefault();
    const url = "http://localhost:5009/api/login";
    axios
      .post(url, {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem("user", res.data.accessToken);
        this.setState({
          accessToken: localStorage.getItem("user")
        });
        alert("Welcome!");
      })
      .catch(err => alert(err.response));
  };

  redirectHandler = () => {
    this.setState({ redirect: false });
  };

  componentDidMount() {
    this.setState({ accessToken: localStorage.getItem("user") });
  }

  RegisterHandler = e => {
    e.preventDefault();
    const url = "http://localhost:5009/api/register";
    axios
      .post(url, {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        plainPassword: this.state.password
      })
      .then(() => {
        this.setState({
          redirect: true
        });
        alert("Success!!");
      })
      .catch(err => alert(err.response));
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({ accessToken: null, email: "null", password: "null" });
  };

  render() {
    return (
      <HashRouter>
        <Routes
          myEmailHandler={this.myEmailHandler}
          myUsernameHandler={this.myUsernameHandler}
          myPasswordHandler={this.myPasswordHandler}
          confirmPasswordHandler={this.confirmPasswordHandler}
          mySubmitHandler={this.mySubmitHandler}
          RegisterHandler={this.RegisterHandler}
          handleLogout={this.handleLogout}
          accessToken={this.state.accessToken}
          redirect={this.state.redirect}
          redirectHandler={this.redirectHandler}
          error={this.state.error}
        />
      </HashRouter>
    );
  }
}
