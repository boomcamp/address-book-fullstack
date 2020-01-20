import React, { Component } from 'react'
import { MDBIcon, MDBContainer, MDBBtn, MDBBtnGroup } from 'mdbreact';

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
                <MDBBtnGroup>
                    <MDBBtn color="primary" onClick={this.sortASC}><MDBIcon icon="sort-alpha-down" size="sm" /> </MDBBtn>
                    <MDBBtn color="primary" onClick={this.sortDESC}><MDBIcon icon="sort-alpha-down-alt" size="sm" /> </MDBBtn>
                </MDBBtnGroup>
            </MDBContainer>
        )
    }
}

export default Sort
