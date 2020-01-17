import React from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import MaterialTable from "material-table";
import styled from "styled-components";
import axios from "axios";
import { Tooltip } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import EditAttributesIcon from "@material-ui/icons/EditAttributes";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import Button from "@material-ui/core/Button";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

import Modal from "../Modal/Modal";
import Edit from "../Modal/Edit";
import Group from "../Modal/Group";
import Dialog from "../Modal/deleteWarning";

const Div = styled.div`
  margin-top: 100px;
  width: 100%;
`;

export default class Users extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "First Name", field: "fname" },
        { title: "Last Name", field: "lname" },
        {
          title: "Contact Number",
          field: "mobile_phone"
        },
        {
          title: "",
          field: "",
          render: rowData => (
            <React.Fragment>
              <Tooltip TransitionComponent={Zoom} title="Edit Contact">
                <Button>
                  <EditAttributesIcon onClick={() => this.clickOpen(rowData)} />
                </Button>
              </Tooltip>

              <Tooltip title="Delete Contact">
                <Button>
                  <DeleteSweepIcon
                    onClick={() => this.props.deleteHandler(rowData)}
                  />
                </Button>
              </Tooltip>
            </React.Fragment>
          )
        },
        {
          title: "Add to Group",
          field: "",
          render: rowData => (
            <React.Fragment>
              <MDBDropdown>
                <MDBDropdownToggle
                  nav
                  style={{
                    color: "black"
                  }}
                >
                  <Tooltip title="Add to group">
                    <GroupAddIcon />
                  </Tooltip>
                </MDBDropdownToggle>
                <MDBDropdownMenu classic="true">
                  {this.state.groupData
                    ? this.state.groupData.map(x => (
                        <MDBDropdownItem
                          key={x.id}
                          onClick={() => this.props.addToGroup(rowData)}
                        >
                          {x.groupName}
                        </MDBDropdownItem>
                      ))
                    : ""}
                </MDBDropdownMenu>
              </MDBDropdown>
            </React.Fragment>
          )
        },
        {
          title: "Group",
          field: "groupName"
        }
      ],
      data: [],
      groupData: [],
      toggleModal: false,
      rowInfo: {},
      isOpen: false
    };
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleClickOpen = () => {
    this.setState({ toggleModal: true });
  };
  clickOpen = rowInfo => {
    this.setState({ toggleModal: true, rowData: rowInfo });
  };
  clickToOpen = rowInfo => {
    this.setState({ toggleModal: true, rowData: rowInfo });
  };
  clickToOpen2 = groupData => {
    this.setState({ toggleModal: true, x: groupData });
  };

  handleClose = () => {
    this.setState({ toggleModal: false });
  };

  myChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount = () => {
    axios
      .get(
        `http://localhost:5009/api/contacts/${localStorage.getItem("user_id")}`
      )
      .then(results => {
        this.setState({ data: results.data });

        axios.get("http://localhost:5009/api/groups").then(results => {
          this.setState({ groupData: results.data });
        });
      })
      .catch(err => {
        alert(err.response.data.error);
      });
  };

  contactHandler = event => {
    event.preventDefault();
    const Obj = {
      user_id: localStorage.getItem("user_id"),
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
        toast.success("Success!!");
        this.handleClose();
      })
      .catch(err => toast.error(err.response.data.error));
  };

  editHandler = event => {
    event.preventDefault();
    const Obj = {
      user_id: localStorage.getItem("user_id"),
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
    const url = `http://localhost:5009/api/contacts/${this.state.rowData.id}/edit`;

    axios
      .patch(url, Obj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`
        }
      })
      .then(res => {
        toast.info("Successfully Edited!!");
        this.clickClose();
      })
      .catch(err => toast.error(err.response.data.error));
  };

  addGroupHandler = event => {
    event.preventDefault();
    const Obj = {
      user_id: localStorage.getItem("user_id"),
      group_name: this.state.group_name
    };
    const url = "http://localhost:5009/api/groups/add";
    axios
      .post(url, Obj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`
        }
      })
      .then(() => {
        toast.success("Group Added!!");
        this.clickToClose();
      })
      .catch(err => toast.error(err.response.data.error));
  };

  groupName = event => {
    event.preventDefault();
    axios
      .delete(`http://localhost:5009/api/groups/${this.state.x.id}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`
        }
      })
      .then(() => {
        toast.info("Successfully Deleted");
        this.clickToClose2();
      })
      .catch(err => toast.error(err.response.data.error));
  };

  render() {
    return (
      <div>
        <ToastContainer />
        <header>
          <MDBNavbar
            color="primary-color-dark"
            dark
            expand="md"
            position="fixed"
          >
            <MDBNavbarBrand>
              <strong className="white-text">Address Book</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
              <MDBNavbarNav left>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      Groups
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default" left="true">
                      {this.state.groupData
                        ? this.state.groupData.map(x => (
                            <MDBDropdownItem
                              key={x.id}
                              onClick={() => this.clickToOpen2(x)}
                            >
                              {x.group_name}
                            </MDBDropdownItem>
                          ))
                        : ""}
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav>
                      <AccountBoxIcon></AccountBoxIcon>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default" right>
                      <MDBDropdownItem onClick={this.props.handleLogout}>
                        Log Out
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
          <Div>
            <MaterialTable
              title={
                <div>
                  <span
                    style={{
                      fontSize: 25,
                      fontWeight: "bold"
                    }}
                  >
                    Contacts
                  </span>
                  <Tooltip title="Add Group">
                    <Button
                      style={{
                        marginLeft: 20
                      }}
                      onClick={this.clickToOpen}
                    >
                      <GroupAddIcon></GroupAddIcon>
                      <div
                        style={{
                          marginLeft: 10
                        }}
                      >
                        Add a Group
                      </div>
                    </Button>
                  </Tooltip>
                </div>
              }
              columns={this.state.columns}
              data={this.state.data}
              actions={[
                {
                  icon: "add",
                  tooltip: "Add User",
                  isFreeAction: true,
                  onClick: this.handleClickOpen
                }
              ]}
              options={{
                actionsColumnIndex: -1,
                search: false,
                sorting: false
              }}
            />
          </Div>
          <Modal
            handleClickOpen={this.state.toggleModal}
            handleClose={this.handleClose}
            myChangeHandler={this.myChangeHandler}
            contactHandler={this.contactHandler}
          />
          <Edit
            clickOpen={this.state.clickModal}
            handleClose={this.handleClose}
            rowInfo={this.state.rowData}
            editHandler={this.editHandler}
            myChangeHandler={this.myChangeHandler}
          />
          <Group
            clickToOpen={this.state.modalToggler}
            handleClose={this.handleClose}
            addGroupHandler={this.addGroupHandler}
            addToGroup={this.addToGroup}
            editOnchange={this.editOnchange}
          />
          <Dialog
            clickToOpen2={this.state.modalToggler2}
            handleClose={this.handleClose}
            groupName={this.groupName}
          />
        </header>
      </div>
    );
  }
}
