import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBIcon } from 'mdbreact';
export class ViewGroup extends Component {
    view = () => {
        this.props.handleChangeView();
    }
    render() {
        return (
            <div>
                <MDBContainer hidden={this.props.ViewContact}>
                    <MDBBtn className="width-button" color="primary" onClick={this.view}><MDBIcon icon="eye" /> <b className="d-none d-xl-block">View Contacts</b></MDBBtn>
                </MDBContainer>
            </div>
        )
    }
}

export default ViewGroup
