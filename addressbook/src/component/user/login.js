import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBAlert } from 'mdbreact';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errUsername: false,
            errPassword: false,
            valid: true,
        };
    }
    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.props.history.push('/addressbook')
        }
    }

    submitHandler = () => {
        if (this.state.username === "") {
            this.setState({ errUsername: true })
        }
        if (this.state.password === "") {
            this.setState({ errPassword: true })
        }
        if (this.state.username && this.state.password !== "") {
            Axios.post(`http://localhost:4001/addressbook/login`, { "username": this.state.username, "password": this.state.password })
                .then(res => {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("id", res.data.id);
                    this.props.history.push('/addressbook')
                    this.notify();
                })
                .catch(err => {
                    this.setState({ valid: false })
                })
        }
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value, errUsername: false, errPassword: false, valid: true });
    };
    notify = () => toast.success("Login Success");
    render() {
        return (
            <MDBContainer>
                <ToastContainer />
                <MDBRow className="mt-5">
                    <MDBCol md="12">
                        <br /><br /><br /><br />
                    </MDBCol>
                    <MDBCol md="6" className="offset-md-3">
                        <MDBCard>
                            <MDBCardBody>
                                <form>
                                    <p className="h4 text-center py-4"><MDBIcon className="cyan-text pr-3" icon="user-alt" size="6x" /></p>
                                    {this.state.valid === false ?
                                        <MDBAlert color="danger" >
                                            Incorrect Username or Password!
                                    </MDBAlert> : null}
                                    <label>Username</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                <i className="fa fa-user prefix"></i>
                                            </span>
                                        </div>
                                        <input type="text" name="username" className={this.state.errUsername === false ? "form-control" : "form-control is-invalid"} onChange={this.changeHandler} />
                                    </div>

                                    {this.state.errUsername === true ? <div className="red-text">Username is required</div> : null}
                                    <label>Password</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                <MDBIcon icon="lock" />
                                            </span>
                                        </div>
                                        <input type="password" name="password" className={this.state.errPassword === false ? "form-control" : "form-control is-invalid"} onChange={this.changeHandler} />
                                    </div>
                                    {this.state.errPassword === true ? <div className="red-text">Password is required</div> : null}
                                    <div className="text-right py-4 mt-3">
                                        <Link to="/register">
                                            <MDBBtn outline color="info" >
                                                Create Account
                                            </MDBBtn>
                                        </Link>
                                        <MDBBtn outline color="info" onClick={this.submitHandler}>
                                            Login
                                        </MDBBtn>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
