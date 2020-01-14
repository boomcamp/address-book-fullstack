import React from "react";
import axios from "axios";
import "./App.css";
import { HashRouter } from "react-router-dom";

import Routes from "./components/Routes/Routes";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  myChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  mySubmitHandler = event => {
    event.preventDefault();
    const Obj = {
      username: this.state.username,
      password: this.state.password
    };
    const url = "http://localhost:5009/api/login";
    axios
      .post(url, Obj)
      .then(res => {
        localStorage.setItem("user", res.data.token);
        localStorage.setItem("userId", res.data.id);
        this.setState({
          token: localStorage.getItem("user")
        });
        alert("Welcome!");
      })
      .catch(err => alert(err.response.data.error));
  };

  RegisterHandler = event => {
    event.preventDefault();
    const Obj = {
      username: this.state.username,
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      plainPassword: this.state.password
    };
    const url = "http://localhost:5009/api/register";
    axios
      .post(url, Obj)
      .then(() => {
        this.setState({
          redirect: true
        });
        alert("Success!!");
      })
      .catch(err => alert(err.response.data.error));
  };

  ContactHandler = event => {
    event.preventDefault();
    const Obj = {
      userId: localStorage.getItem("userId"),
      fname: this.state.fname,
      lname: this.state.lname,
      home_phone: this.state.homePhone,
      work_phone: this.state.workPhone,
      mobile_phone: this.state.mobilePhone,
      email: this.state.email,
      city: this.state.city,
      state_or_province: this.state.state_or_province,
      postal_code: this.state.postalCode,
      country: this.state.country
    };
    const url = "http://localhost:5009/api/contacts/add";
    axios
      .post(url, Obj)
      .then(() => {
        this.setState({
          redirect: false
        });
        alert("Success!!");
      })
      .catch(err => alert(err.response.data.error));
  };

  editHandler = event => {
    event.preventDefault();
    const Obj = {
      userId: localStorage.getItem("userId"),
      fname: this.state.fname,
      lname: this.state.lname,
      home_phone: this.state.homePhone,
      work_phone: this.state.workPhone,
      mobile_phone: this.state.mobilePhone,
      email: this.state.email,
      city: this.state.city,
      state_or_province: this.state.state_or_province,
      postal_code: this.state.postalCode,
      country: this.state.country
    };
    const url = `http://localhost:3000/api/contacts/edit`;
    axios
      .patch(url, Obj)
      .then(() => {
        this.setState({
          redirect: false
        });
        alert("Success!!");
      })
      .catch(err => alert(err.response.data.error));
  };

  redirectHandler = () => {
    this.setState({ redirect: false });
  };

  componentDidMount() {
    this.setState({ token: localStorage.getItem("user") });
  }

  handleLogout = () => {
    localStorage.clear();
    this.setState({ token: null, email: "null", password: "null" });
  };

  render() {
    return (
      <HashRouter>
        <Routes
          myChangeHandler={this.myChangeHandler}
          mySubmitHandler={this.mySubmitHandler}
          RegisterHandler={this.RegisterHandler}
          ContactHandler={this.ContactHandler}
          handleLogout={this.handleLogout}
          token={this.state.token}
          redirect={this.state.redirect}
          redirectHandler={this.redirectHandler}
          error={this.state.error}
        />
      </HashRouter>
    );
  }
}
