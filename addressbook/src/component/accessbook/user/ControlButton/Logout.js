import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBIcon } from 'mdbreact';
export default class Logout extends Component {
    constructor() {
        super();
        this.state = {
            modal: false
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleLogout = () => {
        this.props.logout()
    }
    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBBtn onClick={this.toggle} className="width-button" color="primary"><MDBIcon icon="sign-out-alt" /> <b className="d-none d-xl-block">Sign Out</b></MDBBtn>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalBody>
                            <MDBModalBody >
                                Are you sure to Sign out?
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="danger" onClick={this.toggle} className="float-right">No</MDBBtn>
                                <MDBBtn color="primary" onClick={this.handleLogout} className="float-right">Yes</MDBBtn>
                            </MDBModalFooter>

                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </div>
        )
    }
}
