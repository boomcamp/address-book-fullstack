import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Routes from "./routes";
import "./App.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {
    this.setState({
      accessToken: localStorage.getItem("user")
    });
  };

  handleSignUp = event => {
    event.preventDefault();
    event.target.className += " was-validated";

    const Obj = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.fname,
      lastName: this.state.lname
    };
    axios
      .post("http://localhost:4001/register", Obj)
      .then(() => {
        this.setState({ regSuccess: true });
        toast.success("User has been Successfully Added!");
      })
      .catch(errors => {
        try {
          toast.error(errors.response.data.error);
        } catch {
          console.log(errors);
        }
      });
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({
      accessToken: "",
      username: "",
      password: ""
    });
    toast.success("Successfully Logout!");
  };

  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    const Obj = {
      username: this.state.username,
      password: this.state.password
    };
    this.state.username && this.state.password
      ? axios
          .post("http://localhost:4001/login", Obj)
          .then(response => {
            localStorage.setItem("user", response.data.token);
            localStorage.setItem("userId", response.data.id);
            this.setState({
              accessToken: localStorage.getItem("user")
            });
            toast(`Hello There! ${this.state.username}`);
          })
          .catch(errors => {
            try {
              toast.error(errors.response.data.error);
            } catch {
              console.log(errors);
            }
          })
      : toast.error("Fill Out All Fields");
  };

  createContactHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";

    const Obj = {
      user_id: localStorage.getItem("userId"),
      first_name: this.state.fname,
      last_name: this.state.lname,
      email: this.state.email,
      home_phone: this.state.hphone,
      mobile_phone: this.state.mphone,
      work_phone: this.state.wphone,
      city: this.state.city,
      state_or_province: this.state.state_province,
      postal_code: this.state.zip,
      country: this.state.country
    };
    axios
      .post("http://localhost:4001/contacts/create", Obj)
      .then(() => {
        toast.success(`Contact has been Successfully Added`);
      })
      .catch(errors => {
        try {
          toast.error(errors.response.data.error);
        } catch {
          console.log(errors);
        }
      });
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log([event.target.name], event.target.value);
  };

  render() {
    return (
      <HashRouter>
        <ToastContainer />
        <Routes
          accessToken={this.state.accessToken}
          userId={this.state.userId}
          handleOnChange={this.handleOnChange}
          handleLogin={this.handleLogin}
          handleSignUp={this.handleSignUp}
          handleLogout={this.handleLogout}
          regSuccess={this.state.regSuccess}
          validation={this.state.validation}
          confirm={this.state.confirm}
          handleReg={this.handleReg}
          submitHandler={this.submitHandler}
          changeHandler={this.changeHandler}
          createContactHandler={this.createContactHandler}
        />
      </HashRouter>
    );
  }
}
