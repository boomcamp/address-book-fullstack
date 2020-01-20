import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon } from 'mdbreact';
export default class AddContact extends Component {
    handleAddContact = event => {
        this.props.getAddValue(event.target)
    }
    Save = () => {
        this.props.onclickSave();
    }
    openModal = () => {
        this.props.OpenModal()
    }
    render() {
        return (
            <MDBContainer>
                <MDBBtn onClick={this.openModal} className="width-button" color="primary">Add Contact</MDBBtn>
                <MDBModal isOpen={this.props.modal} toggle={this.openModal} size="lg">
                    <MDBModalHeader toggle={this.openModal}>Add Contact</MDBModalHeader>
                    <MDBModalBody>

                        <MDBRow>
                            <MDBCol md="6">
                                <label>
                                    First Name
                                    </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                            <i className="fa fa-user prefix"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        id="defaultFormFirstNameEx"
                                        className={this.props.first_nameisRequired ? "form-control" : "form-control is-invalid"}
                                        name="first_name"
                                        onChange={this.handleAddContact}
                                        placeholder={this.props.first_nameisRequired ? "" : "First name is required!"}

                                    />
                                </div>

                                <label>
                                    Last Name
                                    </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                            <i className="fa fa-user prefix"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        id="defaultFormLastNameEx"
                                        className="form-control"
                                        name="last_name"
                                        onChange={this.handleAddContact}
                                    />
                                </div>

                                <label>
                                    Home Phone
                                    </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                            <MDBIcon icon="phone-alt" />
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        id="defaultFormHomePhoneEx"
                                        className="form-control home_phone"
                                        name="home_phone"
                                        onChange={this.handleAddContact}
                                    />
                                </div>


                                <label>
                                    Mobile Phone
                                    </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                            <MDBIcon icon="phone-alt" />
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        id="defaultFormMobilePhoneEx"
                                        className={this.props.mobile_phoneisRequired ? "form-control" : "form-control is-invalid"}
                                        name="mobile_phone"
                                        onChange={this.handleAddContact}
                                        placeholder={this.props.mobile_phoneisRequired ? "" : " Mobile number is required!"}
                                    />
                                </div>

                                <label>
                                    Work Phone
                                    </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                            <MDBIcon icon="phone-alt" />
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        id="defaultFormWorkPhoneEx"
                                        className="form-control work_phone"
                                        name="work_phone"
                                        onChange={this.handleAddContact}
                                    />
                                </div>
                            </MDBCol>
                            <MDBCol md="6">
                                <label>
                                    Email
                                    </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                            <MDBIcon icon="at" />
                                        </span>
                                    </div>
                                    <input
                                        type="email"
                                        id="defaultFormEmailEx"
                                        className="form-control email"
                                        name="email"
                                        onChange={this.handleAddContact}
                                    />
                                </div>

                                <label>
                                    City
                                    </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                            <MDBIcon icon="city" />
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        id="defaultFormCityEx"
                                        className="form-control city"
                                        name="city"
                                        onChange={this.handleAddContact}
                                    />
                                </div>

                                <label>
                                    State or Province
                                    </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                            <MDBIcon icon="home" />
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        id="defaultFormStateorProvinvceEx"
                                        className="form-control"
                                        name="state_or_province"
                                        onChange={this.handleAddContact}
                                    />
                                </div>

                                <label>
                                    Postal Code
                                    </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                            <MDBIcon icon="map-marked" />
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        id="defaultFormPostalCodeEx"
                                        className="form-control"
                                        name="postal_code"
                                        onChange={this.handleAddContact}
                                    />
                                </div>

                                <label>
                                    Country
                                    </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                            <MDBIcon icon="flag" />
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        id="defaultFormCountryEx"
                                        className="form-control"
                                        name="country"
                                        onChange={this.handleAddContact}
                                    />
                                </div>

                            </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="danger" onClick={this.openModal}>cancel</MDBBtn>
                        <MDBBtn color="primary" onClick={this.Save}>Save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )
    }
}
