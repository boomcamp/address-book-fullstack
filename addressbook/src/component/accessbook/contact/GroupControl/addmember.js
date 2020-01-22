import React, { Component } from 'react'
import { MDBTableHead, MDBTableBody, MDBTable, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon } from 'mdbreact';
import Axios from 'axios';

export class addmember extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            MembertoAdd: []
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
        this.getData();
    }
    getData = () => {
        Axios.get(`http://localhost:4001/addressbook/getcontacttoadd/${this.props.groupId}`)
        .then(res =>{
            this.setState({
                ...this.state,
                MembertoAdd: res.data
            })
        })
    }
    onAdd = (data) => {
        Axios.post(`http://localhost:4001/addressbook/addmember`, data)
            .then(res => {
                this.getData();
            }).catch(err => {
                console.log("Adding member error")
            })
    }
    render() {
        const userId = localStorage.getItem('id');
        return (
            <React.Fragment>
                <MDBBtn onClick={this.toggle} color="primary" className="rounded"><MDBIcon icon="plus" /></MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Add Members</MDBModalHeader>
                    <MDBModalBody>
                        <MDBTable>
                            <MDBTableHead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Action</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {this.state.MembertoAdd.map(res => (
                                    res.userId === parseInt(userId) ?
                                        <tr key={res.id}>
                                            <td>{res.first_name}</td>
                                            <td>{res.last_name}</td>
                                            <td><button onClick={() => this.onAdd({ "GroupId": this.props.groupId, "contactId": res.id, "first_name": res.first_name, "last_name": res.last_name, "mobile_number": res.mobile_phone })}>Add</button></td>
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

export default addmember
