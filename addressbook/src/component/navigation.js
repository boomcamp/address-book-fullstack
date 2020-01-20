import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBIcon } from "mdbreact";
class navigation extends Component {
  state = {
    isOpen: false
  };

  render() {
    return (
        <MDBNavbar color="info-color-dark shadow-box-example z-depth-2" dark expand="md" fixed="top">
          <MDBNavbarBrand>
            <strong className="white-text"><MDBIcon icon="address-book" /> Address Book</strong>
          </MDBNavbarBrand>
        </MDBNavbar>

    );
  }
}

export default navigation;