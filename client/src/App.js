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
      toggleAdd: false,
      toggleEdit: false,
      toggleDel: false,
      toggleG: false,
      left: false,
      rowValue: {}
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
      .then(() => {
        this.setState({ success: true });
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

  myhandleLogout = () => {
    localStorage.clear();
    this.setState({ token: "", username: "", password: "" });
    message.success("Successfully logout", 1);
  };

  handleSuccess = () => {
    this.setState({ success: false });
  };

  addContact = () => {
    const inputs = {
      user_id: localStorage.getItem("userId"),
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      home_phone: this.state.home_phone,
      mobile_phone: this.state.mobile_phone,
      work_phone: this.state.work_phone,
      city: this.state.city,
      state_or_province: this.state.state_or_province,
      postal_code: this.state.postal_code,
      country: this.state.country
    };
    axios
      .post("http://localhost:4005/add-contact", inputs)
      .then(res => {
        message.success("Contact Successfully added");
        this.handleCloseAdd();
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

  editContact = (event, rowValue) => {
    event.preventDefault();
    const inputs = {
      user_id: localStorage.getItem("userId"),
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      home_phone: this.state.home_phone,
      mobile_phone: this.state.mobile_phone,
      work_phone: this.state.work_phone,
      city: this.state.city,
      state_or_province: this.state.state_or_province,
      postal_code: this.state.postal_code,
      country: this.state.country
    };
    axios
      .patch(`http://localhost:4005/update-contact/${rowValue.id}`, inputs)
      .then(res => {
        message.info("Edit Successful!", 2);
        this.handleCloseEdit();
      });
  };

  deleteContact = (event, rowValue) => {
    console.log(rowValue);
    event.preventDefault();
    axios
      .delete(`http://localhost:4005/delete-contact/${rowValue.id}`)
      .then(() => {
        message.warning("Contact successfully deleted", 2);
        this.handleCloseDel();
      });
  };

  addGroup = () => {
    const inputs = {
      user_id: localStorage.getItem("userId"),
      group_name: this.state.group_name
    };
    axios
      .post("http://localhost:4005/create-group", inputs)
      .then(() => {
        message.success("Group contact successfully created");
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOpenAdd = () => {
    this.setState({ toggleAdd: true });
  };

  handleCloseAdd = () => {
    this.setState({ toggleAdd: false });
  };

  handleOpenEdit = rowValue => {
    this.setState({
      first_name: rowValue.first_name,
      last_name: rowValue.last_name,
      email: rowValue.email,
      home_phone: rowValue.home_phone,
      mobile_phone: rowValue.mobile_phone,
      work_phone: rowValue.work_phone,
      city: rowValue.city,
      state_or_province: rowValue.state_or_province,
      postal_code: rowValue.postal_code,
      country: rowValue.country
    });
    this.setState({ rowData: rowValue, toggleEdit: true });
  };

  handleCloseEdit = () => {
    this.setState({ toggleEdit: false });
  };

  handleOpenDel = rowValue => {
    this.setState({ rowData: rowValue, toggleDel: true });
  };

  handleCloseDel = () => {
    this.setState({ toggleDel: false });
  };

  handleOpenGroup = () => {
    this.setState({ toggleG: true });
  };

  handleCloseGroup = () => {
    this.setState({ toggleG: false });
  };

  handleOpenSide = () => {
    this.setState({ left: true });
  };

  handleCloseSide = () => {
    this.setState({ left: false });
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
          addContact={this.addContact}
          editContact={this.editContact}
          handleChange={this.handleChange}
          handleOpenAdd={this.handleOpenAdd}
          handleCloseAdd={this.handleCloseAdd}
          toggleAdd={this.state.toggleAdd}
          handleOpenEdit={this.handleOpenEdit}
          handleCloseEdit={this.handleCloseEdit}
          toggleEdit={this.state.toggleEdit}
          rowValue={this.state.rowData}
          deleteContact={this.deleteContact}
          handleOpenDel={this.handleOpenDel}
          handleCloseDel={this.handleCloseDel}
          toggleDel={this.state.toggleDel}
          addGroup={this.addGroup}
          handleOpenGroup={this.handleOpenGroup}
          handleCloseGroup={this.handleCloseGroup}
          toggleG={this.state.toggleG}
          handleOpenSide={this.handleOpenSide}
          handleCloseSide={this.handleCloseSide}
          left={this.state.left}
        />
      </HashRouter>
    );
  }
}
