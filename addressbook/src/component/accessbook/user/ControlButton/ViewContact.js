import React, { Component } from 'react'
import { MDBContainer, MDBBtn } from 'mdbreact';
export class ViewGroup extends Component {
    view = () => {
        this.props.handleChangeView();
    }
    render() {
        return (
            <div>
                <MDBContainer hidden={this.props.ViewContact}>
                    <MDBBtn className="width-button" color="primary" onClick={this.view}>View Contacts</MDBBtn>
                </MDBContainer>
            </div>
        )
    }
}

export default ViewGroup
