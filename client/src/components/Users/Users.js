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
import AccountBox from "@material-ui/icons/AccountBox";
import Home from "@material-ui/icons/Home";
import Work from "@material-ui/icons/Work";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import LocationOn from "@material-ui/icons/LocationOn";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FaArrowCircleDown, FaMobileAlt, FaCity } from "react-icons/fa";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
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

const Box = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

const Item = styled.div`
  padding: 10px 20px 10px 20px;
  width: 50%;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
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
                onClick={() => this.clickOpen4(rowData)}
                style={{
                  border: "transparent",
                  backgroundColor: "transparent"
                }}
              >
                <FaArrowCircleDown />
              </button>
            </React.Fragment>
          )
        },
        {
          title: "Name",
          field: "fname",
          render: rowData => (
            <React.Fragment>
              <div
                style={{
                  fontWeight: "bold"
                }}
              >
                {" "}
                {" " + rowData.fname + " " + rowData.lname}
              </div>
            </React.Fragment>
          )
        },
        {
          title: "",
          field: "lname",
          render: () => <React.Fragment></React.Fragment>
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
                  <DeleteSweepIcon onClick={() => this.clickOpen3(rowData)} />
                </Button>
              </Tooltip>
            </React.Fragment>
          )
        }
      ],
      sortType: "asc",
      data: [],
      rowInfo: {},
      sort: "",
      toggleModal: false,
      toggleModal1: false,
      toggleModal2: false,
      toggleModal3: false,
      toggleModal4: false,
      toggleModal5: false,
      bottomToggle: false,
      isOpen: false
    };
  }

  componentDidMount = () => {
    return localStorage.getItem("user") ? this.fetchData(undefined) : "";
  };

  fetchData = data => {
    data
      ? axios
          .get(
            `http://localhost:5009/api/groups/${data.id}/list?sort=${this.state.sort}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("user")}`
              }
            }
          )
          .then(results => {
            this.setState({ data: results.data, groupVal: data });

            axios
              .get(
                `http://localhost:5009/api/groups/${localStorage.getItem(
                  "user_id"
                )}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("user")}`
                  }
                }
              )
              .then(results => {
                this.setState({ groupData: results.data });
              });
          })
          .catch(err => {
            alert(err);
          })
      : axios
          .get(
            `http://localhost:5009/api/contacts/${localStorage.getItem(
              "user_id"
            )}?sort=${this.state.sort}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("user")}`
              }
            }
          )
          .then(results => {
            this.setState({ data: results.data, groupVal: undefined });

            axios
              .get(
                `http://localhost:5009/api/groups/${localStorage.getItem(
                  "user_id"
                )}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("user")}`
                  }
                }
              )
              .then(results => {
                this.setState({ groupData: results.data });
              });
          })
          .catch(err => {
            alert(err);
          });
  };

  contactHandler = event => {
    event.preventDefault();
    const Obj = {
      user_id: localStorage.getItem("user_id"),
      group_id: this.state.groupVal.id,
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
        this.fetchData(this.state.groupVal);
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
        this.fetchData(this.state.groupVal);
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
        this.fetchData(this.state.groupVal);
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
        this.fetchData(this.state.groupVal);
        toast.success("Group Added!!");
        this.clickClose1();
      })
      .catch(err => toast.error(err.response.data.error));
  };

  deleteGroup = event => {
    event.preventDefault();
    axios
      .delete(`http://localhost:5009/api/groups/${this.state.x.id}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`
        }
      })
      .then(() => {
        this.setState({ groupVal: undefined });
        this.fetchData(this.state.groupVal);
        toast.info("Successfully Deleted");
        this.clickClose2();
      })
      .catch(err => toast.error(err.response.data.error));
  };

  deleteHandler = event => {
    event.preventDefault();
    axios
      .delete(
        `http://localhost:5009/api/contacts/${this.state.rowData.id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`
          }
        }
      )
      .then(() => {
        this.fetchData(this.state.groupVal);
        toast.info("Successfully Deleted");
        this.clickClose3();
      })
      .catch(err => toast.error(err.response.data.error));
  };

  sortHandler = data => {
    this.setState({
      sort: data
    });
    this.fetchData(this.state.groupVal);
  };

  //OpenToggle
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
  clickOpen3 = rowInfo => {
    this.setState({ toggleModal4: true, rowData: rowInfo });
  };
  clickOpen4 = rowInfo => {
    this.setState({ toggleModal5: true, rowData: rowInfo });
  };
  clickBottomToggle = rowInfo => {
    this.setState({ bottomToggle: true, rowData: rowInfo });
  };
  //CloseToggle
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
  clickClose3 = () => {
    this.setState({ toggleModal4: false });
  };
  clickClose4 = () => {
    this.setState({ toggleModal5: false });
  };
  closeBottomToggle = () => {
    this.setState({ bottomToggle: false });
  };

  myChangeHandler1 = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <ToastContainer />
        <Dialog
          open={this.state.toggleModal5}
          onClose={this.clickClose4}
          maxWidth={"xs"}
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{"Contact Details"}</DialogTitle>
          <DialogContent dividers>
            <Box>
              <Item>
                <span
                  style={{
                    width: "100%"
                  }}
                >
                  <AccountBox />
                  {"  "}
                  {this.state.rowData
                    ? this.state.rowData.fname + " " + this.state.rowData.lname
                    : ""}
                </span>
              </Item>
              <Item>
                <span
                  style={{
                    width: "100%"
                  }}
                >
                  <Work />
                  {"  "}
                  {this.state.rowData ? this.state.rowData.work_phone : ""}
                </span>
              </Item>
            </Box>
            <Box>
              <Item>
                <span
                  style={{
                    width: "100%"
                  }}
                >
                  <Home />
                  {"  "}
                  {this.state.rowData ? this.state.rowData.home_phone : ""}
                </span>
              </Item>
              <Item>
                <span
                  style={{
                    width: "100%"
                  }}
                >
                  <FaMobileAlt size={25} />
                  {"  "}
                  {this.state.rowData ? this.state.rowData.mobile_phone : ""}
                </span>
              </Item>
            </Box>
            <Box>
              <Item>
                <span
                  style={{
                    width: "100%"
                  }}
                >
                  <MdEmail size={25} />
                  {"  "}
                  {this.state.rowData ? this.state.rowData.email : ""}
                </span>
              </Item>
              <Item>
                <span
                  style={{
                    width: "100%"
                  }}
                >
                  <FaCity size={25} />
                  {"  "}
                  {this.state.rowData ? this.state.rowData.city : ""}
                </span>
              </Item>
            </Box>
            <Box>
              <Item>
                <span
                  style={{
                    width: "100%"
                  }}
                >
                  <LocationOn />
                  {"  "}
                  {this.state.rowData
                    ? this.state.rowData.state_or_province
                    : ""}
                </span>
              </Item>
              <Item>
                <span
                  style={{
                    width: "100%"
                  }}
                >
                  <LocationOn />
                  {"  "}
                  {this.state.rowData ? this.state.rowData.country : ""}
                </span>
              </Item>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.clickClose4} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
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
                  Show Contact by:
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default" right>
                  <MDBDropdownItem onClick={() => this.fetchData(undefined)}>
                    All Contacts
                  </MDBDropdownItem>
                  {this.state.groupData
                    ? this.state.groupData.map(x => (
                        <MDBDropdownItem
                          key={x.id}
                          onClick={() => this.fetchData(x)}
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
                    <Button
                      onClick={this.deleteGroup}
                      color="primary"
                      autoFocus
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={this.state.toggleModal4}
                  onClose={this.clickClose3}
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this contact?"}
                  </DialogTitle>
                  <DialogContent></DialogContent>
                  <DialogActions>
                    <Button onClick={this.clickClose3} color="primary">
                      No
                    </Button>
                    <Button
                      onClick={this.deleteHandler}
                      color="primary"
                      autoFocus
                    >
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
                  <MDBDropdownItem onClick={() => this.sortHandler("asc")}>
                    Ascending
                  </MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem onClick={() => this.sortHandler("desc")}>
                    Descending
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </Grp>
            <span>
              <MaterialTable
                title={
                  <div>
                    <span
                      style={{
                        fontSize: 25,
                        fontWeight: "bold"
                      }}
                    >
                      {this.state.groupVal ? (
                        <div>
                          {this.state.groupVal.group_name}{" "}
                          <AiOutlineUsergroupDelete
                            cursor="pointer"
                            onClick={() => this.clickOpen2(this.state.groupVal)}
                          />
                        </div>
                      ) : (
                        "All Contacts"
                      )}
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
                  sorting: false
                }}
              />
            </span>
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
