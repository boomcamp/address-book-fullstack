import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import ContactList from '../accessbook/contact/ContactList';
import UserAction from '../accessbook/user/userControl';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GroupList from '../accessbook/contact/GroupList';
export default class accessbook extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            group: [],
            Searched: "",
            searchInput: "",
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
            modal: false,
            ContactList: false,
            GroupList: true,
            ViewGroup: false,
            ViewContact: true,
            first_nameisRequired: true,
            mobile_phoneisRequired: true,
            groupMember: [],
            sort: "DESC",
            isEmailValid: true,
        }
    }
    componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.history.push('/')
        } else {
            this.getData()
        }
    }
    getData = () => {
        Axios.get(`http://localhost:4001/addressbook/getandsortcontact/${this.state.sort}`)
            .then(res => {
                this.setState({ data: res.data })
            })

        Axios.get(`http://localhost:4001/addressbook/getgroup`)
            .then(res => {
                this.setState({ group: res.data })
            })

        Axios.get(`http://localhost:4001/addressbook/getgroupmember`)
            .then(res => {
                this.setState({ groupMember: res.data })
            })
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
        this.getData();
    }
    onLogout = () => {
        localStorage.clear();
        this.props.history.push('/')
    }
    onSearch = (val) => {
        let searched = this.state.data.filter(data => new RegExp(`${val}`, 'i').test(data.first_name + data.last_name))
        this.setState({
            ...this.state,
            Searched: searched,
            searchInput: val
        })
    }
    setContactVAlue = (value) => {
        this.setState({ [value.name]: value.value, first_nameisRequired: true, mobile_phoneisRequired: true, isEmailValid: true });
    }
    onSaveContact = () => {
        if (this.state.first_name === "") {
            this.setState({ first_nameisRequired: false })
        }
        if (this.state.mobile_phone === "") {
            this.setState({ mobile_phoneisRequired: false })
        }
        if (
            this.state.first_name && this.state.mobile_phone !== ""
        ) {
            if (this.state.email !== "") {
                if (/\S+@\S+\.\S+/.test(this.state.email)) {
                    Axios.post(`http://localhost:4001/addressbook/addcontact`, {
                        "userId": localStorage.getItem('id'),
                        "first_name": this.state.first_name,
                        "last_name": this.state.last_name,
                        "home_phone": this.state.home_phone,
                        "mobile_phone": this.state.mobile_phone,
                        "work_phone": this.state.work_phone,
                        "email": this.state.email,
                        "city": this.state.city,
                        "state_or_province": this.state.state_or_province,
                        "postal_code": this.state.postal_code,
                        "country": this.state.country
                    }).then(res => {
                        this.setState({
                            ...this.state,
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
                            isEmailValid: true
                        })
                        this.toggle();
                        this.notify();
                    }).catch(err => {
                        console.log("Adding error")
                    })
                } else {
                    this.setState({ isEmailValid: false })
                }
            } else {
                Axios.post(`http://localhost:4001/addressbook/addcontact`, {
                    "userId": localStorage.getItem('id'),
                    "first_name": this.state.first_name,
                    "last_name": this.state.last_name,
                    "home_phone": this.state.home_phone,
                    "mobile_phone": this.state.mobile_phone,
                    "work_phone": this.state.work_phone,
                    "email": this.state.email,
                    "city": this.state.city,
                    "state_or_province": this.state.state_or_province,
                    "postal_code": this.state.postal_code,
                    "country": this.state.country
                }).then(res => {
                    this.setState({
                        ...this.state,
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
                        isEmailValid: true
                    })
                    this.toggle();
                    this.notify();
                }).catch(err => {
                    console.log("Adding error")
                })
            }
        }
    }
    onChangeViewMode = () => {
        this.setState({
            ...this.state,
            ContactList: !this.state.ContactList,
            GroupList: !this.state.GroupList,
            ViewGroup: !this.state.ViewGroup,
            ViewContact: !this.state.ViewContact,
            isEmailValid: true
        })
    }
    sortASC = () => {
        this.setState({ sort: "ASC" })
        this.getData();
    }
    sortDESC = () => {
        this.setState({ sort: "DESC" })
        this.getData();
    }
    notify = () => toast.success("New Contact Added");
    newgroupcreated = () => toast.success("New Group Created");
    deleteNotify = () => toast.error("Contact Deleted");
    Editnotify = () => toast.success("Edit Saved")
    ErrorNotify = () => toast.error("Fill Required Field")
    NotifyDeleteGroup = () => toast.error("Group Deleted");
    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <br />
                <MDBContainer fluid className="mt-3 pt-5">
                    <MDBRow>
                        <MDBCol lg="2">
                            <UserAction isEmailValid={this.state.isEmailValid} sortASC={this.sortASC} sortDESC={this.sortDESC} first_nameisRequired={this.state.first_nameisRequired} mobile_phoneisRequired={this.state.mobile_phoneisRequired} getSearchedValue={this.onSearch} notify={this.newgroupcreated} Toastify={this.notify} handlelogout={this.onLogout} handleAddcontact={this.setContactVAlue} onSave={this.onSaveContact} toggle={this.toggle} modal={this.state.modal} Refreshed={this.getData} ChangView={this.onChangeViewMode} ViewGroup={this.state.ViewGroup} ViewContact={this.state.ViewContact} />
                        </MDBCol>
                        <MDBCol lg="10" hidden={this.state.ContactList}>
                            <ContactList ErrorNotify={this.ErrorNotify} data={this.state.data} Editnotify={this.Editnotify} searched={this.state.Searched} searchInput={this.state.searchInput} Refreshed={this.getData} deleteNotify={this.deleteNotify} />
                        </MDBCol>
                        <MDBCol lg="10" hidden={this.state.GroupList}>
                            <GroupList NotifyDeleteGroup={this.NotifyDeleteGroup} getData={this.getData} MembertoAdd={this.state.MembertoAdd} groupMember={this.state.groupMember} group={this.state.group} data={this.state.data} />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </React.Fragment>
        )
    }
}