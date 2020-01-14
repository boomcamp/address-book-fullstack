import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Routes from "./routes";
import "./App.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";

const initialState = {
  isLoading: false,
  isModal: false,
  deleteContact: false
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isModal: false,
      deleteContact: false
    };
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
    toast.info("Successfully Logout!");
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
  editContactHandler = (event, rowData) => {
    event.preventDefault();
    event.target.className += " was-validated";
    this.setState({
      isLoading: true
    });
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
      .patch(`http://localhost:4001/contacts/${rowData.id}/edit`, Obj, {
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
      })
      .then(() => {
        this.setState(initialState);
        toast.success(`Contact has been Successfully Edited`);
      })
      .catch(errors => {
        try {
          toast.error(errors.response.data.error);
        } catch {
          console.log(errors);
        }
      });
  };
  deleteContactHandler = (event, rowData) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    axios
      .delete(`http://localhost:4001/contacts/${rowData.id}/delete`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
      })
      .then(() => {
        this.setState(initialState);
        toast.success(`Contact has been Successfully Deleted`);
      })
      .catch(errors => {
        try {
          toast.error(errors.response.data.error);
        } catch {
          console.log(errors);
        }
      });
  };

  createContactHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    this.setState({ isLoading: true });
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
      .post("http://localhost:4001/contacts/create", Obj, {
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
      })
      .then(() => {
        this.setState(initialState);
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
  };

  handleEditOpen = (val, option) => {
    option === "delete"
      ? this.setState({ deleteContact: true, isModal: true, currentData: val })
      : this.setState({
          deleteContact: false,
          isModal: true,
          currentData: val,
          fname: val.first_name,
          lname: val.last_name,
          email: val.email,
          hphone: val.home_phone,
          mphone: val.mobile_phone,
          wphone: val.work_phone,
          city: val.city,
          state_province: val.state_or_province,
          zip: val.postal_code,
          country: val.country
        });
  };

  handleAddOpen = () => {
    this.setState({ currentData: null, deleteContact: false, isModal: true });
  };

  handleAddClose = () => {
    this.setState({ isModal: false });
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
          isLoading={this.state.isLoading}
          handleEditOpen={this.handleEditOpen}
          handleAddOpen={this.handleAddOpen}
          handleAddClose={this.handleAddClose}
          editContactHandler={this.editContactHandler}
          deleteContactHandler={this.deleteContactHandler}
          isModal={this.state.isModal}
          deleteContact={this.state.deleteContact}
          currentData={this.state.currentData}
        />
      </HashRouter>
    );
  }
}
