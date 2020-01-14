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
import EditAttributesIcon from "@material-ui/icons/EditAttributes";

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
          title: "Details",
          render: rowData => (
            <React.Fragment>
              <button onClick={() => this.handleModal(rowData)}>Details</button>
            </React.Fragment>
          )
        },
        {
          title: "",
          field: "",
          render: rowData => (
            <React.Fragment>
              <EditAttributesIcon
                onClick={this.ClickOpen}
                fontSize="large"
                cursor="pointer"
              ></EditAttributesIcon>
            </React.Fragment>
          )
        }
      ],
      data: [],
      toggleModal: false,
      ClickModal: false
    };
    this.onClick = this.onClick.bind(this);
  }

  handleModal = rowData => {
    console.log(rowData);
  };

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

  ClickOpen = () => {
    this.setState({ ClickModal: true });
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
                <MDBNavItem>
                  <MDBNavLink to="#">Contacts</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <button
                    className="handleLogout"
                    onClick={this.props.handleLogout}
                    style={{
                      border: "transparent",
                      backgroundColor: "transparent",
                      color: "white"
                    }}
                  >
                    Log Out
                  </button>
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
            editHandler={this.props.editHandler}
          />
        </header>
      </div>
    );
  }
}
