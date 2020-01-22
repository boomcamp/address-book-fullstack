import React, { Component } from 'react'
import { MDBTableHead, MDBTableBody, MDBTable, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon } from 'mdbreact';
import Axios from 'axios';

export class viewmember extends Component {
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
        this.props.getData();
    }
    onRemove = (data) => {
        Axios.delete(`http://localhost:4001/addressbook/removemember/${data}`)
            .then(res => {
                this.props.getData();
            }).catch(err => {
                console.log("Delete Failed");
            })
    }
    render() {
        return (
            <React.Fragment>
                <MDBBtn onClick={this.toggle}  color="info" className="rounded"><MDBIcon icon="eye" /></MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>"{this.props.groupName}" Members</MDBModalHeader>
                    <MDBModalBody>
                        <MDBTable>
                            <MDBTableHead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Action</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody >
                                {this.props.groupMember.map(res => (
                                    res.GroupId === this.props.groupId ?
                                        <tr key={res.id}>
                                            <td>{res.first_name}</td>
                                            <td>{res.last_name}</td>
                                            <td><button onClick={() => this.onRemove(res.id)}>Remove</button></td>
                                        </tr>
                                        : 
                                        null
                                ))}
                            </MDBTableBody>
                        </MDBTable>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="danger" onClick={this.toggle}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </React.Fragment>


        )
    }
}

export default viewmember
