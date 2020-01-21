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
    this.state = {
      isLoading: false,
      isModal: false,
      sort: "asc"
    };
  }

  componentDidMount = () => {
    if (localStorage.getItem("userId")) {
      this.setState({
        accessToken: localStorage.getItem("token"),
        isLoading: true
      });
    } else {
      this.setState({ accessToken: localStorage.getItem("token") });
    }
  };

  componentDidUpdate = () => {
    if (this.state.isLoading) {
      this.state.groupData
        ? this.fetchContact(this.state.groupData)
        : this.fetchContact(1);
      axios
        .get(
          `http://localhost:4001/addressbook/${localStorage.getItem(
            "userId"
          )}/all?sort=${this.state.sort}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        )
        .then(response => {
          this.setState({
            groups: response.data.allGroups,
            isLoading: false
          });
        });
      axios
        .get(`http://localhost:4001/fetch/${localStorage.getItem("userId")}`)
        .then(res => {
          this.setState({
            pName: res.data[0].firstName + " " + res.data[0].lastName
          });
        });
    }
  };

  fetchContact = data => {
    return axios
      .get(
        `http://localhost:4001/addressbook/${localStorage.getItem(
          "userId"
        )}/all?sort=${this.state.sort}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        data === 2
          ? this.setState({
              contacts: response.data,
              groupData: null
            })
          : data === 1
          ? this.setState({
              contacts: response.data
            })
          : axios
              .get(
                `http://localhost:4001/groups/${data.id}/contacts?sort=${this.state.sort}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
                }
              )
              .then(response => {
                this.setState({
                  contacts: response.data,
                  groupData: data
                });
              });
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

    return this.state.email &&
      this.state.username &&
      this.state.password &&
      this.state.fname &&
      this.state.lname
      ? axios
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
          })
      : "";
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({
      accessToken: "",
      username: "",
      password: "",
      groupData: null
    });
    toast("Successfully Logout!");
  };

  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    const Obj = {
      username: this.state.username,
      password: this.state.password
    };

    return this.state.username || this.state.password
      ? axios
          .post("http://localhost:4001/login", Obj)
          .then(response => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.id);
            this.setState({
              accessToken: localStorage.getItem("token")
            });
            this.setState({
              isLoading: true,
              isModal: false
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
      : "";
  };

  editContactHandler = (event, rowData) => {
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
      .patch(`http://localhost:4001/contacts/${rowData.id}/edit`, Obj, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(() => {
        this.setState({
          isLoading: true,
          isModal: false
        });
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
    rowData.map(e =>
      axios
        .delete(`http://localhost:4001/contacts/${e.id}/delete`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        .then(() => {
          this.setState({
            isLoading: true,
            isModal: false
          });
          toast.success(`Contact has been Successfully Deleted`);
        })
        .catch(errors => {
          try {
            toast.error(errors.response.data.error);
          } catch {
            console.log(errors);
          }
        })
    );
  };

  editGroupHandler = (event, data) => {
    event.preventDefault();
    const Obj = {
      group_name: this.state.groupName
    };
    axios
      .patch(`http://localhost:4001/groups/${data.id}/edit`, Obj, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => {
        this.setState({
          groupData: res.data[0],
          isLoading: true,
          isModal: false
        });
        toast.success(`Group has been Successfully Edited`);
      })
      .catch(errors => {
        try {
          toast.error(errors.response.data.error);
        } catch {
          console.log(errors);
        }
      });
  };

  deleteGroupHandler = (event, data) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:4001/groups/${data.id}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(() => {
        this.setState({
          isLoading: true,
          isModal: false,
          groupData: null
        });
        toast.success(`Group has been Successfully Deleted`);
      })
      .catch(errors => {
        try {
          toast.error(errors.response.data.error);
        } catch {
          console.log(errors);
        }
      });
  };

  addAGroupHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    const Obj = {
      user_id: localStorage.getItem("userId"),
      group_name: this.state.groupName
    };
    axios
      .post("http://localhost:4001/groups/create", Obj, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(() => {
        this.setState({
          isLoading: true,
          isModal: false
        });
        toast.success(`Group has been Successfully Added`);
      })
      .catch(errors => {
        try {
          toast.error(errors.response.data.error);
        } catch {
          console.log(errors);
        }
      });
  };

  addToGroupHandler = (event, rowData) => {
    event.preventDefault();
    rowData.map(e =>
      axios
        .patch(
          `http://localhost:4001/groups/${e.id}/add`,
          {
            group_id: this.state.selectedGroup
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        )
        .then(() => {
          this.setState({
            isLoading: true,
            isModal: false
          });
          toast.success(`Contact has been Successfully Edited`);
        })
        .catch(errors => {
          try {
            toast.error(errors.response.data.error);
          } catch {
            console.log(errors);
          }
        })
    );
  };

  createContactHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    const Obj = {
      user_id: localStorage.getItem("userId"),
      group_id: this.state.groupData ? this.state.groupData.id : null,
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
    return this.state.fname &&
      this.state.lname &&
      this.state.email &&
      this.state.hphone &&
      this.state.mphone &&
      this.state.wphone &&
      this.state.city &&
      this.state.state_province &&
      this.state.zip &&
      this.state.country
      ? axios
          .post("http://localhost:4001/contacts/create", Obj)
          .then(() => {
            this.setState({
              isLoading: true,
              isModal: false
            });
            toast.success(`Contact has been Successfully Added`);
          })
          .catch(errors => {
            try {
              toast.error(errors.response.data.error);
            } catch {
              console.log(errors);
            }
          })
      : "";
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (event.target.name === "sort") {
      this.setState({ isLoading: true });
    }
    if (event.target.name === "cpassword") {
      this.state.password === event.target.value
        ? (event.target.className = "form-control is-valid")
        : (event.target.className = "form-control is-invalid");
    }
  };

  selectHandler = event => {
    return event
      ? this.setState({ selectedGroup: event.value })
      : this.setState({ selectedGroup: null });
  };

  handleModalOpen = (val, option) => {
    return option === "viewContact"
      ? this.setState({
          viewContact: true,
          editContact: false,
          deleteGroup: false,
          editGroup: false,
          addAGroup: false,
          addToGroup: false,
          addContact: false,
          deleteContact: false,
          currentData: val,
          isModal: true
        })
      : option === "deleteGroup"
      ? this.setState({
          editContact: false,
          viewContact: false,
          deleteGroup: true,
          editGroup: false,
          addAGroup: false,
          addToGroup: false,
          addContact: false,
          deleteContact: false,
          currentData: val,
          isModal: true
        })
      : option === "editGroup"
      ? this.setState({
          editContact: false,
          viewContact: false,
          editGroup: true,
          deleteGroup: false,
          addAGroup: false,
          addToGroup: false,
          addContact: false,
          deleteContact: false,
          groupName: val.group_name,
          currentData: val,
          isModal: true
        })
      : option === "addAGroup"
      ? this.setState({
          editContact: false,
          viewContact: false,
          currentData: null,
          deleteGroup: false,
          editGroup: false,
          addAGroup: true,
          addToGroup: false,
          addContact: false,
          deleteContact: false,
          isModal: true
        })
      : option === "addContact"
      ? this.setState({
          editContact: false,
          viewContact: false,
          addContact: true,
          addAGroup: false,
          currentData: null,
          deleteGroup: false,
          editGroup: false,
          addToGroup: false,
          deleteContact: false,
          isModal: true
        })
      : option === "addGroup"
      ? this.setState({
          editContact: false,
          viewContact: false,
          addAGroup: false,
          editGroup: false,
          deleteGroup: false,
          deleteContact: false,
          addContact: false,
          addToGroup: true,
          isModal: true,
          currentData: val
        })
      : option === "delete"
      ? this.setState({
          editContact: false,
          viewContact: false,
          editGroup: false,
          addToGroup: false,
          deleteGroup: false,
          addContact: false,
          deleteContact: true,
          isModal: true,
          currentData: val
        })
      : option === "edit"
      ? this.setState({
          editContact: true,
          viewContact: false,
          editGroup: false,
          addContact: false,
          addToGroup: false,
          deleteGroup: false,
          addAGroup: false,
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
        })
      : "";
  };

  handleModalClose = () => {
    this.setState({ isModal: false });
  };

  render() {
    return (
      <HashRouter>
        <ToastContainer />
        <Routes
          accessToken={this.state.accessToken}
          handleLogin={this.handleLogin}
          handleSignUp={this.handleSignUp}
          handleLogout={this.handleLogout}
          regSuccess={this.state.regSuccess}
          submitHandler={this.submitHandler}
          changeHandler={this.changeHandler}
          selectHandler={this.selectHandler}
          createContactHandler={this.createContactHandler}
          handleModalOpen={this.handleModalOpen}
          handleModalClose={this.handleModalClose}
          editContactHandler={this.editContactHandler}
          deleteContactHandler={this.deleteContactHandler}
          editGroupHandler={this.editGroupHandler}
          deleteGroupHandler={this.deleteGroupHandler}
          editGroup={this.state.editGroup}
          deleteGroup={this.state.deleteGroup}
          isModal={this.state.isModal}
          deleteContact={this.state.deleteContact}
          addAGroup={this.state.addAGroup}
          addAGroupHandler={this.addAGroupHandler}
          addToGroup={this.state.addToGroup}
          addToGroupHandler={this.addToGroupHandler}
          currentData={this.state.currentData}
          contact={this.state.contacts}
          groups={this.state.groups}
          search={this.state.search}
          editContact={this.state.editContact}
          viewContact={this.state.viewContact}
          groupData={this.state.groupData}
          fetchContact={this.fetchContact}
          pName={this.state.pName}
        />
      </HashRouter>
    );
  }
}
