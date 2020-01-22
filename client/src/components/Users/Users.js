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
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import axios from "axios";
import { Tooltip } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import EditAttributesIcon from "@material-ui/icons/EditAttributes";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { FaArrowCircleDown } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
//Modals
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

const Resize = styled.div`
  @media only screen and (max-width: 900px),
    (height: 1024px) and (width: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) and (orientation: landscape),
    (width: 1024px) and (height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) and (orientation: portrait) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead tr {
      display: none;
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    tr {
      border: 1px solid lightgray;
      border-radius: 10px;
    }

    td {
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 50%;
    }

    td:before {
      position: absolute;
      top: 10px;
      left: 6px;
      width: 50%;
      padding: 10px;
      white-space: nowrap;
    }

    td:nth-of-type(1):before {
      content: "Contact Details";
    }
    td:nth-of-type(2):before {
      content: "Name";
    }
    td:nth-of-type(3):before {
      content: "Contact #";
    }
    td:nth-of-type(4):before {
      content: "Add to group";
    }
    td:nth-of-type(5):before {
      content: "Actions";
    }
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
      data: [],
      rowInfo: {},
      sort: "",
      toggleModal: false,
      toggleModal1: false,
      toggleModal2: false,
      toggleModal3: false,
      toggleModal4: false,
      toggleModal5: false,
      toggleModal6: false,
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
      group_id: this.state.groupVal ? this.state.groupVal.id : null,
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
        toast.success("Success!!", {
          position: toast.POSITION.TOP_CENTER
        });
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
      .then(() => {
        this.fetchData(this.state.groupVal);
        toast.info("Successfully Edited!!", {
          position: toast.POSITION.TOP_CENTER
        });
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
        toast.success(`Successfully added to the group`, {
          position: toast.POSITION.TOP_CENTER
        });
        this.clickClose();
      })
      .catch(err => toast.error(err.response.data.error));
  };

  editGroupName = event => {
    event.preventDefault();
    const Obj = {
      group_name: this.state.group_name
    };
    const url = `http://localhost:5009/api/groups/${this.state.groupVal.id}/edit`;

    axios
      .patch(url, Obj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`
        }
      })
      .then(res => {
        this.fetchData(res.data[0]);
        toast.success(`Successfully Edited`, {
          position: toast.POSITION.TOP_CENTER
        });
        this.clickClose5();
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
        toast.success("Group Added!!", {
          position: toast.POSITION.TOP_CENTER
        });
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
        toast.info("Successfully Deleted", {
          position: toast.POSITION.TOP_CENTER
        });
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
        toast.info("Successfully Deleted", {
          position: toast.POSITION.TOP_CENTER
        });
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
  clickOpen = contactInfo => {
    this.setState({ toggleModal1: true, rowData: contactInfo });
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
  clickOpen5 = groupData => {
    this.setState({ toggleModal6: true, groupVal: groupData });
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
  clickClose5 = () => {
    this.setState({ toggleModal6: false });
  };

  myChangeHandler1 = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  searchFilter = event => {
    this.setState({
      filter: event.target.value
    });
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
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flexWrap: "wrap"
              }}
            >
              <TextField
                id="outlined-basic"
                label="Search"
                onChange={this.searchFilter}
              />
            </div>
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
            <Resize>
              <MaterialTable
                title={
                  <div>
                    <span
                      style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        color: "darkblue"
                      }}
                    >
                      {this.state.groupVal ? (
                        <div>
                          {this.state.groupVal.group_name}{" "}
                          <FiEdit
                            cursor="pointer"
                            onClick={() => this.clickOpen5(this.state.groupVal)}
                          />
                          {"  "}
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
                data={this.state.data.filter(row => {
                  const regex = new RegExp(this.state.filter, "gi");
                  if (regex.test(row.fname) || regex.test(row.lname)) {
                    return row;
                  }
                  return null;
                })}
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
                  sorting: false,
                  paging: false,
                  search: false
                }}
              />
            </Resize>
          </Div>
          <Modal
            handleClickOpen={this.state.toggleModal}
            myChangeHandler1={this.myChangeHandler1}
            contactHandler={this.contactHandler}
            handleClose={this.handleClose}
          />
          <Edit
            myChangeHandler1={this.myChangeHandler1}
            clickOpen={this.state.toggleModal1}
            editHandler={this.editHandler}
            clickClose={this.clickClose}
          />
          <Group
            myChangeHandler1={this.myChangeHandler1}
            addGroupHandler={this.addGroupHandler}
            clickOpen1={this.state.toggleModal2}
            clickOpen2={this.state.toggleModal3}
            clickOpen3={this.state.toggleModal4}
            clickOpen4={this.state.toggleModal5}
            clickOpen5={this.state.toggleModal6}
            deleteHandler={this.deleteHandler}
            editGroupName={this.editGroupName}
            clickClose1={this.clickClose1}
            clickClose2={this.clickClose2}
            clickClose3={this.clickClose3}
            clickClose4={this.clickClose4}
            clickClose5={this.clickClose5}
            deleteGroup={this.deleteGroup}
            addToGroup={this.addToGroup}
            rowInfo={this.state.rowData}
          />
        </header>
      </div>
    );
  }
}
