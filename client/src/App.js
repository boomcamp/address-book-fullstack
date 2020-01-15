import React from "react";
import axios from "axios";
import "./App.css";
import { HashRouter } from "react-router-dom";

import Routes from "./components/Routes/Routes";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      toggleModal: false
    };
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
        alert(`Welcome ${res.data.username}!`);
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
      .post(url, Obj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`
        }
      })
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
      .post(url, Obj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`
        }
      })
      .then(() => {
        this.setState({
          redirect: false
        });
        alert("Success!!");
      })
      .catch(err => alert(err.response.data.error));
  };

  DeleteHandler = rowData => {
    axios
      .delete(`http://localhost:5009/api/contacts/${rowData.id}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`
        }
      })
      .then(() => {
        alert("Successfully Deleted");
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
    this.setState({ token: null, username: "null", password: "null" });
  };

  render() {
    return (
      <HashRouter>
        <Routes
          myChangeHandler={this.myChangeHandler}
          mySubmitHandler={this.mySubmitHandler}
          RegisterHandler={this.RegisterHandler}
          redirectHandler={this.redirectHandler}
          ContactHandler={this.ContactHandler}
          DeleteHandler={this.DeleteHandler}
          handleLogout={this.handleLogout}
          handleClose={this.handleClose}
          redirect={this.state.redirect}
          token={this.state.token}
          error={this.state.error}
        />
      </HashRouter>
    );
  }
}
