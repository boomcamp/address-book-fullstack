import React, { Component } from 'react'
import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';

export class Sort extends Component {
    sortASC = () => {
        this.props.sortASC();
    }
    sortDESC = () => {
        this.props.sortDESC();
    }
    render() {
        return (
            <MDBContainer>
                <MDBBtn color="primary"  className="width-button" onClick={this.sortASC}><MDBIcon icon="sort-alpha-down" size="sm" /> <b className="d-none d-xl-block">ASC</b></MDBBtn>
                <MDBBtn color="primary"  className="width-button" onClick={this.sortDESC}><MDBIcon icon="sort-alpha-down-alt" size="sm" /> <b className="d-none d-xl-block">DESC</b></MDBBtn>
            </MDBContainer>
        )
    }
}

export default Sort
