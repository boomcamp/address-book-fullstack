import React from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Modal from "../Modal/Modal";
import Edit from "../Edit/Edit";

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
          title: "Email Address",
          field: "email"
        },
        {
          title: "",
          field: "",
          render: rowData => (
            <React.Fragment>
              <Tooltip TransitionComponent={Zoom} title="Edit Contact">
                <Button>
                  <EditIcon onClick={() => this.clickOpen(rowData)} />
                </Button>
              </Tooltip>

              <Tooltip title="Delete Contact">
                <Button>
                  <DeleteIcon
                    onClick={() => this.props.deleteHandler(rowData)}
                  />
                </Button>
              </Tooltip>
            </React.Fragment>
          )
        }
      ],
      data: [],
      toggleModal: false,
      clickModal: false,
      rowInfo: {},
      isOpen: false,
      isUpdating: false
    };
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleClickOpen = () => {
    this.setState({ toggleModal: true });
  };

  handleClose = () => {
    this.setState({ toggleModal: false });
  };

  clickOpen = rowInfo => {
    this.setState({ clickModal: true, rowData: rowInfo });
  };

  clickClose = () => {
    this.setState({ clickModal: false });
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.setState({
      isUpdating: true
    });
    this.loadPage();
  };

  componentDidUpdate = () => {
    if (this.state.isUpdating) {
      this.loadPage();
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  loadPage = () => {
    axios
      .get(
        `http://localhost:5009/api/contacts/${localStorage.getItem("userId")}`
      )
      .then(results => {
        if (this._isMounted) {
          this.setState({ data: results.data });
        }
      });
  };

  editHandler = event => {
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

  editOnchange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <ToastContainer />
        <header>
          <MDBNavbar color="primary-color-dark" dark expand="md">
            <MDBNavbarBrand>
              <strong className="white-text">Address Book</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
              <MDBNavbarNav left>
                <MDBNavItem active>
                  <MDBNavLink to="/">Home</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
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
              title="Contacts"
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
                actionsColumnIndex: -1
              }}
            />
          </Div>
          <Modal
            handleClickOpen={this.state.toggleModal}
            handleClose={this.handleClose}
            myChangeHandler={this.props.myChangeHandler}
            contactHandler={this.props.contactHandler}
          />
          <Edit
            clickOpen={this.state.clickModal}
            clickClose={this.clickClose}
            myChangeHandler={this.props.myChangeHandler}
            rowInfo={this.state.rowData}
            editHandler={this.editHandler}
            editOnchange={this.editOnchange}
          />
        </header>
      </div>
    );
  }
}
