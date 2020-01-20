import React, { Component } from 'react'
import { MDBRow, MDBCol, MDBIcon, MDBCardBody } from "mdbreact";
import View from '../contact/ContactControl/ViewContact';
import Delete from '../contact/ContactControl/DeleteContact';
export default class ContactList extends Component {
    RefreshData = () => {
        this.props.Refreshed();
    }
    deleteNotify = () => {
        this.props.deleteNotify();
    }
    Editnotify = () => {
        this.props.Editnotify();
    }
    render() {
        const id = localStorage.getItem('id');
        const userId = parseInt(id)
        return (
            <React.Fragment>
                <MDBRow>
                    <MDBCol sm="12" >
                        <div className="header z-depth-2 rounded border border-info"><h3 className="blue-text pr-3"> <MDBIcon icon="address-book" /> CONTACTS</h3></div>
                    </MDBCol>
                    <br /><br />
                    <MDBCol sm="12">
                        <MDBRow className=" mt-2">
                            {
                                !Array.isArray(this.props.searched) || !this.props.searched.length ?
                                    this.props.searchInput.length > 0 ?
                                        <div><img src="https://www.buzzdine.com/img/not-found.png" alt="https://www.buzzdine.com/img/not-found.png" className="img-fluid rounded mx-auto d-block"></img></div>
                                        :
                                        this.props.data.map(res => (
                                            res.userId === userId ?
                                                <MDBCol sm="3" key={res.id} className="mt-3 Box-Contact">
                                                    <div className="shadow-box-example z-depth-2 rounded block-example border border-info">
                                                        <MDBRow>

                                                            <MDBCol sm="12">

                                                                <MDBCardBody className="border border-info rounded">
                                                                    {res.first_name} {res.last_name}  <br />
                                                                    {res.mobile_phone}
                                                                </MDBCardBody >
                                                                <div className="border border-info rounded">
                                                                    <View id={res.id} ViewData={this.props.data} refreshData={this.RefreshData} Editnotify={this.Editnotify} />
                                                                    <Delete id={res.id} refreshData={this.RefreshData} deleteNotify={this.deleteNotify} />
                                                                </div>

                                                            </MDBCol>
                                                        </MDBRow>
                                                    </div>
                                                </MDBCol>
                                                : null
                                        ))
                                    :
                                    this.props.searched.map((contacts) => (
                                        contacts.userId === userId ?
                                        <MDBCol sm="3" key={contacts.id} className="mt-3 Box-Contact">
                                                    <div className="shadow-box-example z-depth-2 rounded block-example border border-info">
                                                        <MDBRow>

                                                            <MDBCol sm="12">

                                                                <MDBCardBody className="border border-info rounded">
                                                                    {contacts.first_name} {contacts.last_name}  <br />
                                                                    {contacts.mobile_phone}
                                                                </MDBCardBody >
                                                                <div className="border border-info rounded">
                                                                    <View id={contacts.id} ViewData={this.props.data} refreshData={this.RefreshData} Editnotify={this.Editnotify} />
                                                                    <Delete id={contacts.id} refreshData={this.RefreshData} deleteNotify={this.deleteNotify} />
                                                                </div>

                                                            </MDBCol>
                                                        </MDBRow>
                                                    </div>
                                                </MDBCol>
                                            :
                                            null
                                    ))
                            }
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </React.Fragment>
        )
    }
}
