import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBIcon } from 'mdbreact';
import Axios from 'axios';
export default class CreateGroup extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            groupName: '',
            errGroupName: false
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            errGroupName: false
        });
    }
    saveGroup = () => {
        if (this.state.groupName !== "") {
            Axios.post(`http://localhost:4001/addressbook/addgroup`, { "groupName": this.state.groupName, "userId": localStorage.getItem('id') })
                .then(res => {
                    this.toggle();
                    this.props.refreshData();
                    this.props.notify()
                }).catch(err => {
                    console.log("Creating Group error")
                })
        } else {
            this.setState({ errGroupName: true })
        }
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBBtn onClick={this.toggle} className="width-button" color="primary">Create Group</MDBBtn>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalBody>
                            <form>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                            <MDBIcon icon="users" />
                                        </span>
                                    </div>
                                    <input type="text" className={this.state.errGroupName === false ? "form-control" : "form-control is-invalid"} placeholder={this.state.errGroupName === true ? "Group name is required!" : "Group Name"} name="groupName" onChange={this.handleChange} />
                                </div>
                            </form>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="danger" onClick={this.toggle}>Cancel</MDBBtn>
                            <MDBBtn color="primary" onClick={this.saveGroup}>Save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            </div>
        )
    }
}
