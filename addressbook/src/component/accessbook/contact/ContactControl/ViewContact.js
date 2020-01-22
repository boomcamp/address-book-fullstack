import React, { Component } from 'react'
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBRow, MDBCol } from 'mdbreact';
import Axios from 'axios';

export class ViewContact extends Component {
    state = {
        modal: false,
        data: [],
        first_name: "",
        last_name: "",
        home_phone: "",
        mobile_phone: "",
        work_phone: "",
        email: "",
        city: "",
        state_or_province: "",
        postal_code: "",
        country: "",
        inputDisabled: true,
        edit: false,
        isEmailValid: true
    }
    toggle = () => {
        this.props.ViewData.map(res => {
            if (res.id === this.props.id) {
                this.setState({
                    modal: !this.state.modal,
                    data: this.props.ViewData,
                    first_name: res.first_name,
                    last_name: res.last_name,
                    home_phone: res.home_phone,
                    mobile_phone: res.mobile_phone,
                    work_phone: res.work_phone,
                    email: res.email,
                    city: res.city,
                    state_or_province: res.state_or_province,
                    postal_code: res.postal_code,
                    country: res.country,
                });
            }
            return res;
        })
    }
    OnsaveEdit = () => {
        if (this.state.first_name && this.state.mobile_phone !== "") {
            if (this.state.email !== "") {
                if (/\S+@\S+\.\S+/.test(this.state.email)) {
                    Axios({
                        method: 'patch',
                        url: `http://localhost:4001/addressbook/getcontact/${this.props.id}/update`,
                        headers: { Authorization: `Bearer ${localStorage.token}` },
                        data: {
                            first_name: this.state.first_name,
                            last_name: this.state.last_name,
                            home_phone: this.state.home_phone,
                            mobile_phone: this.state.mobile_phone,
                            work_phone: this.state.work_phone,
                            email: this.state.email,
                            city: this.state.city,
                            state_or_province: this.state.state_or_province,
                            postal_code: this.state.postal_code,
                            country: this.state.country
                        }
                    }).then(res => {
                        this.props.refreshData();
                        this.props.Editnotify()
                        this.inputDisabled();
                        this.setState({isEmailValid: true})
                    }).catch(error => {
                        console.log("edit Failed")
                    })
                }else{
                    this.setState({isEmailValid: false})
                }
            } else {
                Axios({
                    method: 'patch',
                    url: `http://localhost:4001/addressbook/getcontact/${this.props.id}/update`,
                    headers: { Authorization: `Bearer ${localStorage.token}` },
                    data: {
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        home_phone: this.state.home_phone,
                        mobile_phone: this.state.mobile_phone,
                        work_phone: this.state.work_phone,
                        email: this.state.email,
                        city: this.state.city,
                        state_or_province: this.state.state_or_province,
                        postal_code: this.state.postal_code,
                        country: this.state.country
                    }
                }).then(res => {
                    this.props.refreshData();
                    this.props.Editnotify()
                    this.inputDisabled();
                    this.setState({isEmailValid: true})
                }).catch(error => {
                    console.log("edit Failed")
                })
            }
        } else {
            this.props.ErrorNotify()
        }
    }
    inputDisabled = () => {
        this.setState({
            ...this.state,
            inputDisabled: !this.state.inputDisabled,
            edit: !this.state.edit,
            isEmailValid: true
        })
    }
    render() {
        return (

            <React.Fragment>
                <MDBBtn onClick={this.toggle} className="rounded" color="primary"><MDBIcon icon="eye" /> View</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                    <MDBModalHeader toggle={this.toggle}><MDBIcon icon="info-circle" size="1x" /> <b>Contact info</b></MDBModalHeader>
                    <MDBModalBody className="text-left">
                        <MDBRow>
                            <MDBCol sm="6">
                                <label>First Name</label>
                                <input type="text" value={this.state.first_name} name="first_name" onChange={(e) => this.setState({
                                    first_name: e.target.value
                                })} disabled={this.state.inputDisabled} className={this.state.first_name !== "" ? "form-control" : "form-control is-invalid"} />
                                <label>Last Name</label>
                                <input type="text" className="form-control" value={this.state.last_name} name="last_name" onChange={(e) => this.setState({
                                    last_name: e.target.value
                                })} disabled={this.state.inputDisabled} />
                                <label>Home Phone</label>
                                <input type="number" className="form-control" value={this.state.home_phone} name="home_phone" onChange={(e) => this.setState({
                                    home_phone: e.target.value
                                })} disabled={this.state.inputDisabled} />
                                <label>Mobile Phone</label>
                                <input type="number" value={this.state.mobile_phone} name="mobile_phone" onChange={(e) => this.setState({
                                    mobile_phone: e.target.value
                                })} disabled={this.state.inputDisabled} className={this.state.mobile_phone !== "" ? "form-control" : "form-control is-invalid"} />
                                <label>Work Phone</label>
                                <input type="number" className="form-control" value={this.state.work_phone} name="work_phone" onChange={(e) => this.setState({
                                    work_phone: e.target.value
                                })} disabled={this.state.inputDisabled} />
                            </MDBCol>
                            <MDBCol sm="6">
                                <label>Email</label>
                                <input type="text" className={this.state.isEmailValid ? "form-control" : "form-control is-invalid"} value={this.state.email} name="email" onChange={(e) => this.setState({
                                    email: e.target.value
                                })} disabled={this.state.inputDisabled} />
                                <label>City</label>
                                <input type="text" className="form-control" value={this.state.city} name="city" onChange={(e) => this.setState({
                                    city: e.target.value
                                })} disabled={this.state.inputDisabled} />
                                <label>State or Province</label>
                                <input type="text" className="form-control" value={this.state.state_or_province} name="state_or_province" onChange={(e) => this.setState({
                                    state_or_province: e.target.value
                                })} disabled={this.state.inputDisabled} />
                                <label>Postal Code</label>
                                <input type="text" className="form-control" value={this.state.postal_code} name="postal_code" onChange={(e) => this.setState({
                                    postal_code: e.target.value
                                })} disabled={this.state.inputDisabled} />
                                <label>Country</label>
                                <input type="text" className="form-control" value={this.state.country} name="country" onChange={(e) => this.setState({
                                    country: e.target.value
                                })} disabled={this.state.inputDisabled} />
                            </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="danger" onClick={this.toggle}>Close</MDBBtn>
                        <MDBBtn color="primary" onClick={this.inputDisabled} hidden={this.state.edit}>Edit</MDBBtn>
                        <MDBBtn color="danger" onClick={this.inputDisabled} hidden={this.state.inputDisabled}>Cancel Edit</MDBBtn>
                        <MDBBtn color="primary" onClick={this.OnsaveEdit} hidden={this.state.inputDisabled}>Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </React.Fragment>
        )
    }
}
export default ViewContact