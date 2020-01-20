import React, { Component } from 'react'
import AddContact from '../user/ControlButton/AddContact';
import CreateGroup from '../user/ControlButton/CreateGroup';
import Logout from '../user/ControlButton/Logout';
import Search from './ControlButton/search';
import ViewGroup from '../user/ControlButton/ViewGroup';
import ViewContact from '../user/ControlButton/ViewContact';
import Sort from '../user/ControlButton/Sort';
export default class userControl extends Component {
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
                <div className="rounded border border-info z-depth-2 ">
                    <Search getSearchValue={this.getSearch} />
                    <div className="smallD">
                        <Sort sortASC={this.sortASC} sortDESC={this.sortDESC} />
                        <AddContact getAddValue={this.getAdd} onclickSave={this.handleSave} OpenModal={this.OPENmodal} modal={this.props.modal} mobile_phoneisRequired={this.props.mobile_phoneisRequired} first_nameisRequired={this.props.first_nameisRequired} />
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
