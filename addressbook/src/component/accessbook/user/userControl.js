import React, { Component } from 'react'
import AddContact from '../user/ControlButton/AddContact';
import CreateGroup from '../user/ControlButton/CreateGroup';
import Logout from '../user/ControlButton/Logout';
import Search from './ControlButton/search';
import ViewGroup from '../user/ControlButton/ViewGroup';
import ViewContact from '../user/ControlButton/ViewContact';
import Sort from '../user/ControlButton/Sort';
import {
    MDBNavbarNav,
    MDBNavItem,
    MDBIcon,
    MDBCollapse,
    MDBBtn,
    MDBContainer
} from 'mdbreact';
export default class userControl extends Component {
    state = {
        collapseID: ''
    };

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ''
        }));
    };
    getSearch = (value) => {
        this.props.getSearchedValue(value)
    }
    onlogout = () => {
        this.props.handlelogout()
    }
    getAdd = (value) => {
        this.props.handleAddcontact(value)
    }
    handleSave = () => {
        this.props.onSave();
    }
    OPENmodal = () => {
        this.props.toggle()
    }
    onrefeshData = () => {
        this.props.Refreshed();
    }
    onChangeView = () => {
        this.props.ChangView();
    }
    notify = () => {
        this.props.notify();
    }
    sortASC = () => {
        this.props.sortASC();
    }
    sortDESC = () => {
        this.props.sortDESC();
    }
    render() {
        return (

            <React.Fragment>
                <div className="cfd8dc blue-grey lighten-4 rounded border border-info z-depth-2 ">
                <Search getSearchValue={this.getSearch} />
                    <MDBContainer className="toggleShow">
                    <MDBBtn
                            onClick={this.toggleCollapse('navbarCollapse1')}
                            className="mt-0 text-right width-button"
                            color="primary"
                            size="sm"
                        ><center><MDBIcon icon="bars" size="lg"/></center> </MDBBtn>
                    </MDBContainer>
                        

                    <MDBCollapse
                        id='navbarCollapse1'
                        isOpen={this.state.collapseID}
                    >
                        <MDBNavbarNav>
                            <MDBNavItem>
                                <Sort sortASC={this.sortASC} sortDESC={this.sortDESC} />
                            </MDBNavItem>
                            <MDBNavItem>
                                <AddContact isEmailValid={this.props.isEmailValid} getAddValue={this.getAdd} onclickSave={this.handleSave} OpenModal={this.OPENmodal} modal={this.props.modal} mobile_phoneisRequired={this.props.mobile_phoneisRequired} first_nameisRequired={this.props.first_nameisRequired} />
                            </MDBNavItem>
                            <MDBNavItem>
                                <CreateGroup refreshData={this.onrefeshData} notify={this.notify} />
                            </MDBNavItem>
                            <MDBNavItem>
                                <ViewGroup handleChangeView={this.onChangeView} ViewGroup={this.props.ViewGroup} />
                            </MDBNavItem>
                            <MDBNavItem>
                                <ViewContact handleChangeView={this.onChangeView} ViewContact={this.props.ViewContact} />
                            </MDBNavItem>
                            <MDBNavItem>
                                <Logout logout={this.onlogout} />
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>

                    
                    <div className="smallD">
                        <Sort sortASC={this.sortASC} sortDESC={this.sortDESC} />
                        <AddContact isEmailValid={this.props.isEmailValid} getAddValue={this.getAdd} onclickSave={this.handleSave} OpenModal={this.OPENmodal} modal={this.props.modal} mobile_phoneisRequired={this.props.mobile_phoneisRequired} first_nameisRequired={this.props.first_nameisRequired} />
                        <CreateGroup refreshData={this.onrefeshData} notify={this.notify} />
                        <ViewGroup handleChangeView={this.onChangeView} ViewGroup={this.props.ViewGroup} />
                        <ViewContact handleChangeView={this.onChangeView} ViewContact={this.props.ViewContact} />
                        <Logout logout={this.onlogout} />
                    </div>
                </div>
                <br />
            </React.Fragment>
        )
    }
}
