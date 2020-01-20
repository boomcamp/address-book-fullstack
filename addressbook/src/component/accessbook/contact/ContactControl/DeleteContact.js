import React, { Component } from 'react'
import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBIcon } from 'mdbreact';
import Axios from 'axios';
export default class DeleteContact extends Component {
    constructor() {
        super();
        this.state = {
            modal: false
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }
    handleDelete = () => {
        Axios.delete(`http://localhost:4001/addressbook/getcontact/${this.props.id}/delete`)
            .then(res => {
                console.log("deleted");
                this.toggle();
                this.props.refreshData();
                this.props.deleteNotify();
            }).catch(err => {
                console.log("Delete Failed");
            })
    }
    render() {
        return (
            <React.Fragment>
                <MDBBtn onClick={this.toggle} color="danger" className="rounded"><MDBIcon icon="trash-alt" /> Delete</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalBody >
                        Are you sure to delete this Contact?
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="danger" onClick={this.toggle}>No</MDBBtn>
                        <MDBBtn color="primary" onClick={this.handleDelete}>Yes</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </React.Fragment>
        )
    }
}
