import React, { Component } from 'react'
import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBIcon } from 'mdbreact';
import Axios from 'axios';

export class deletegroup extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    deleteGroup = () => {
        Axios.delete(`http://localhost:4001/addressbook/deletegroup/${this.props.groupId}`)
        .then(res => {
            console.log("success")
            this.props.getData();
            this.props.NotifyDeleteGroup();
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <React.Fragment>
                <MDBBtn onClick={this.toggle}  color="danger" className="rounded"><MDBIcon icon="trash-alt" /></MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalBody>
                        Are you sure to delete this Group?
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="danger" onClick={this.toggle}>No</MDBBtn>
                        <MDBBtn color="primary" onClick={this.deleteGroup}>Yes</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </React.Fragment>
        )
    }
}

export default deletegroup
