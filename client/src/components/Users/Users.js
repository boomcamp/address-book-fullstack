import React from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import MaterialTable from "material-table";
import styled from "styled-components";

import Modal from "../Modal/Modal";

const Div = styled.div`
  margin-top: 100px;
`;

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      modal14: false
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

  render() {
    const bgBlue = { backgroundColor: "#4285f4" };
    return (
      <div>
        <Router>
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
                columns={[
                  { title: "Name", field: "name" },
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
                    field: "details",
                    render: rowData => (
                      <React.Fragment>
                        <MDBBtn color="primary" onClick={this.handleToggle(14)}>
                          Details
                        </MDBBtn>
                        <MDBModal
                          isOpen={this.state.modal14}
                          handleToggle={this.handleToggle(14)}
                          centered
                        >
                          <MDBModalHeader toggle={this.handleToggle(14)}>
                            Details
                          </MDBModalHeader>
                          <MDBModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </MDBModalBody>
                          <MDBModalFooter>
                            <MDBBtn
                              color="secondary"
                              onClick={this.handleToggle(14)}
                            >
                              Close
                            </MDBBtn>
                            <MDBBtn color="primary">Save changes</MDBBtn>
                          </MDBModalFooter>
                        </MDBModal>
                      </React.Fragment>
                    )
                  }
                ]}
                data={[
                  {
                    name: "Ja Morant",
                    fname: "Demetrius",
                    lname: "Morant",
                    mobile_phone: "+693481368679",
                    email: "jaCool@gmail.com"
                  }
                ]}
                actions={[
                  {
                    icon: "add",
                    tooltip: "Add User",
                    isFreeAction: true,
                    onClick: () => {
                      return <Modal />;
                    }
                  }
                ]}
              />
            </Div>
          </header>
        </Router>
      </div>
    );
  }
}
