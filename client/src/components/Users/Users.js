import React from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink
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

import Modal from "../Modal/Modal";
import Edit from "../Edit/Edit";

const Div = styled.div`
  margin-top: 100px;
`;

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      modal14: false,
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
                  <EditIcon onClick={() => this.ClickOpen(rowData)} />
                </Button>
              </Tooltip>

              <Tooltip title="Delete Contact">
                <Button>
                  <DeleteIcon
                    onClick={() => this.props.DeleteHandler(rowData)}
                  />
                </Button>
              </Tooltip>
            </React.Fragment>
          )
        }
      ],
      data: [],
      toggleModal: false,
      ClickModal: false,
      rowInfo: []
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  handleToggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  handleClickOpen = () => {
    this.setState({ toggleModal: true });
  };

  handleClose = () => {
    this.setState({ toggleModal: false });
  };

  ClickOpen = rowInfo => {
    this.setState({ ClickModal: true, rowData: rowInfo });
  };

  ClickClose = () => {
    this.setState({ ClickModal: false });
  };

  componentDidMount = () => {
    axios
      .get(
        `http://localhost:5009/api/contacts/${localStorage.getItem("userId")}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
        }
      )
      .then(results => {
        this.setState({ data: results.data });
      });
  };

  editOnchange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  editHandler = event => {
    event.preventDefault();
    const url = `http://localhost:5009/api/contacts/${this.state.rowData.id}/edit`;

    let x = this.state.rowData.id;
    delete this.state.rowData.id;
    console.log(this.state.rowData);
    axios
      .patch(url, x, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`
        }
      })
      .then(res => {
        console.log(res);
        this.setState({
          redirect: false
        });
        alert("Successfully Edited!!");
      })
      .catch(err => alert(err.response.data.error));
  };

  render() {
    const bgBlue = { backgroundColor: "#4285f4" };
    return (
      <div>
        <header>
          <MDBNavbar style={bgBlue} dark expand="md" scrolling fixed="top">
            <MDBNavbarBrand href="/">
              <strong>Address Book</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav left>
                <MDBNavItem active>
                  <MDBNavLink to="#">Home</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <Tooltip title="Log Out">
                    <AccountBoxIcon
                      className="handleLogout"
                      onClick={this.props.handleLogout}
                      cursor="pointer"
                      fontSize="large"
                    ></AccountBoxIcon>
                  </Tooltip>
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
                actionsColumnIndex: -1,
                selection: true
              }}
            />
          </Div>
          <Modal
            handleClickOpen={this.state.toggleModal}
            handleClose={this.handleClose}
            myChangeHandler={this.props.myChangeHandler}
            ContactHandler={this.props.ContactHandler}
          />
          <Edit
            ClickOpen={this.state.ClickModal}
            ClickClose={this.ClickClose}
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
