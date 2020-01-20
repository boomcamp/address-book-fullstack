import React from "react";
import axios from "axios";
import "./App.css";
import { HashRouter } from "react-router-dom";
import Routes from "./components/Routes/Routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  myChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    this.setState({ token: localStorage.getItem("user") });
  }

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
        localStorage.setItem("user_id", res.data.id);
        this.setState({
          token: localStorage.getItem("user")
        });
        toast.success(`Welcome ${res.data.username}!`);
      })
      .catch(err => toast.error(err.response.data.error));
  };

  registerHandler = event => {
    event.preventDefault();
    const Obj = {
      user_id: localStorage.getItem("user_id"),
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
        toast.success("Success!!");
      })
      .catch(err => toast.error(err.response.data.error));
  };

  deleteHandler = rowData => {
    axios
      .delete(`http://localhost:5009/api/contacts/${rowData.id}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`
        }
      })
      .then(() => {
        toast.info("Successfully Deleted");
      })
      .catch(err => toast.error(err.response.data.error));
  };

  redirectHandler = () => {
    this.setState({ redirect: false });
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({ token: null });
  };

  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <Routes
            myChangeHandler={this.myChangeHandler}
            mySubmitHandler={this.mySubmitHandler}
            registerHandler={this.registerHandler}
            redirectHandler={this.redirectHandler}
            addGroupHandler={this.addGroupHandler}
            deleteHandler={this.deleteHandler}
            handleLogout={this.handleLogout}
            redirect={this.state.redirect}
            token={this.state.token}
            error={this.state.error}
          />
        </HashRouter>
        <ToastContainer />
      </React.Fragment>
    );
  }
}
