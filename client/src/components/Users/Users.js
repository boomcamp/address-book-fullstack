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
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MaterialTable from "material-table";
import styled from "styled-components";
import axios from "axios";
import { Tooltip } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Zoom from "@material-ui/core/Zoom";
import EditAttributesIcon from "@material-ui/icons/EditAttributes";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FaArrowCircleDown } from "react-icons/fa";

import Modal from "../Modal/Modal";
import Edit from "../Modal/Edit";
import Group from "../Modal/Group";

const Div = styled.div`
  padding-top: 80px;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

const Grp = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Details",
          render: rowData => (
            <React.Fragment>
              <button
                onClick={() => this.clickBottomToggle(rowData)}
                style={{
                  border: "transparent",
                  backgroundColor: "transparent"
                }}
              >
                <FaArrowCircleDown />
              </button>
              <Drawer
                anchor="bottom"
                open={this.state.bottomToggle}
                onClose={this.closeBottomToggle}
              >
                <List>
                  <ListItem>
                    <ListItemText>
                      <h1>Contact Details</h1>
                      <Divider />
                      <p>First Name: {rowData.fname}</p>
                      <p>Last Name: {rowData.fname}</p>
                      <p>Home Phone: {rowData.work_phone}</p>
                      <p>Work Phone: {rowData.mobile_phone}</p>
                      <p>Mobile Phone: {rowData.mobile_phone}</p>
                      <p>Email: {rowData.email}</p>
                      <p>City: {rowData.city}</p>
                      <p>State/Province: {rowData.state_or_province}</p>
                      <p>Postal Code: {rowData.postal_code}</p>
                      <p>Country: {rowData.country}</p>
                    </ListItemText>
                  </ListItem>
                </List>
              </Drawer>
            </React.Fragment>
          )
        },
        {
          title: "Name",
          field: "fname",
          render: rowData => (
            <React.Fragment>
              <div> {" " + rowData.fname + " " + rowData.lname}</div>
            </React.Fragment>
          )
        },
        {
          title: "Contact #",
          field: "mobile_phone"
        },
        {
          title: "Add to group",
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
                <MDBDropdownMenu className="dropdown-default" left="true">
                  {this.state.groupData
                    ? this.state.groupData.map(x => (
                        <MDBDropdownItem
                          key={x.id}
                          onClick={() => this.addToGroup(x.id, rowData)}
                        >
                          {x.group_name}
                        </MDBDropdownItem>
                      ))
                    : ""}
                </MDBDropdownMenu>
              </MDBDropdown>
            </React.Fragment>
          )
        },
        {
          title: "",
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
          title: "Group",
          render: rowData => (
            <React.Fragment>
              <div>
                {this.state.groupData
                  ? this.state.groupData.filter(x => {
                      if (x.id === rowData.group_id) {
                        return console.log(x.group_name);
                      }
                      return null;
                    })
                  : ""}
              </div>
            </React.Fragment>
          )
        }
      ],
      data: [],
      toggleModal: false,
      toggleModal1: false,
      toggleModal2: false,
      toggleModal3: false,
      bottomToggle: false,
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
    this.setState({ toggleModal1: true, rowData: rowInfo });
  };
  clickOpen1 = rowInfo => {
    this.setState({ toggleModal2: true, rowData: rowInfo });
  };
  clickOpen2 = groupData => {
    this.setState({ toggleModal3: true, x: groupData });
  };
  clickBottomToggle = () => {
    this.setState({ bottomToggle: true });
  };

  handleClose = () => {
    this.setState({ toggleModal: false });
  };
  clickClose = () => {
    this.setState({ toggleModal1: false });
  };
  clickClose1 = () => {
    this.setState({ toggleModal2: false });
  };
  clickClose2 = () => {
    this.setState({ toggleModal3: false });
  };
  closeBottomToggle = () => {
    this.setState({ bottomToggle: false });
  };

  myChangeHandler1 = event => {
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

  addToGroup = (grp, cntct) => {
    const Obj = {
      group_id: grp
    };
    const url = `http://localhost:5009/api/contacts/${cntct.id}/edit`;

    axios
      .patch(url, Obj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`
        }
      })
      .then(res => {
        toast.success(`Successfully added to the group`);
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
        this.clickClose1();
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
        this.clickClose2();
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
              <MDBNavbarNav right>
                <MDBNavItem>
                  <Tooltip title="Log Out">
                    <button
                      onClick={this.props.handleLogout}
                      cursor="pointer"
                      style={{
                        border: "transparent",
                        backgroundColor: "transparent",
                        color: "white"
                      }}
                    >
                      Log Out
                    </button>
                  </Tooltip>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
          <Div>
            <Grp>
              <MDBDropdown>
                <MDBDropdownToggle
                  nav
                  caret
                  style={{
                    color: "black"
                  }}
                >
                  Groups
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default" right>
                  {this.state.groupData
                    ? this.state.groupData.map(x => (
                        <MDBDropdownItem
                          key={x.id}
                          onClick={() => this.clickOpen2(x)}
                        >
                          {x.group_name}
                        </MDBDropdownItem>
                      ))
                    : ""}
                </MDBDropdownMenu>
                <Dialog
                  open={this.state.toggleModal3}
                  onClose={this.clickClose2}
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this group"}
                  </DialogTitle>
                  <DialogContent></DialogContent>
                  <DialogActions>
                    <Button onClick={this.clickClose2} color="primary">
                      No
                    </Button>
                    <Button onClick={this.groupName} color="primary" autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </MDBDropdown>
              <MDBDropdown>
                <MDBDropdownToggle
                  nav
                  caret
                  style={{
                    color: "black"
                  }}
                >
                  Sort by:
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default" right>
                  <MDBDropdownItem>Ascending</MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem>Descending</MDBDropdownItem>
                </MDBDropdownMenu>
                <Dialog
                  open={this.state.toggleModal3}
                  onClose={this.clickClose2}
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this group"}
                  </DialogTitle>
                  <DialogContent></DialogContent>
                  <DialogActions>
                    <Button onClick={this.clickClose2} color="primary">
                      No
                    </Button>
                    <Button onClick={this.groupName} color="primary" autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </MDBDropdown>
            </Grp>
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
                },
                {
                  icon: "group",
                  tooltip: "Add Group",
                  isFreeAction: true,
                  onClick: this.clickOpen1
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
            myChangeHandler1={this.myChangeHandler1}
            contactHandler={this.contactHandler}
          />
          <Edit
            clickOpen={this.state.toggleModal1}
            clickClose={this.clickClose}
            rowInfo={this.state.rowData}
            editHandler={this.editHandler}
            myChangeHandler1={this.myChangeHandler1}
          />
          <Group
            clickOpen1={this.state.toggleModal2}
            clickClose1={this.clickClose1}
            addGroupHandler={this.addGroupHandler}
            addToGroup={this.addToGroup}
            myChangeHandler1={this.myChangeHandler1}
          />
        </header>
      </div>
    );
  }
}
