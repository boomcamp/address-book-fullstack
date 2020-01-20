import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
            errPasswordMatch: false,
            errUsername: false,
            errEmail: false,
            errPassword: false,
            errConfirmPasswrod: false,
            EmailisValid: true
        }
    }
    submitHandler = () => {
        if (this.state.username === "") {
            this.setState({ errUsername: true })
        }
        if (this.state.email === "") {
            this.setState({ errEmail: true })
        }
        if (this.state.password === "") {
            this.setState({ errPassword: true })
        }
        if (this.state.confirmpassword === "") {
            this.setState({ errConfirmPasswrod: true })
        }
        if (this.state.username && this.state.email && this.state.password && this.state.confirmpassword !== "") {
            if (/\S+@\S+\.\S+/.test(this.state.email)) {
                if (this.state.password === this.state.confirmpassword) {
                    Axios.post(`http://localhost:4001/addressbook/register`, { "username": this.state.username, "email": this.state.email, "password": this.state.password })
                        .then(result => {
                            localStorage.setItem("token", result.data.token);
                            localStorage.clear();
                            this.props.history.push('/')
                            this.notify();
                        })
                        .catch(err => {
                            console.error(err)
                        })
                } else {
                    this.setState({ errPasswordMatch: true })
                }
            } else {
                this.setState({ EmailisValid: false })
            }
        }
    };

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value,
            errPasswordMatch: false,
            errUsername: false,
            errEmail: false,
            errPassword: false,
            errConfirmPasswrod: false,
            EmailisValid: true
        });
    };
    notify = () => toast.success("Registration Success");
    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="12">
                        <br /><br /><br /><br />
                    </MDBCol>
                    <MDBCol md="6" className="offset-md-3">
                        <MDBCard>
                            <MDBCardBody>
                                <form>
                                    <p className="h4 text-center py-4"><MDBIcon className="cyan-text pr-3" icon="user-alt" size="6x" /></p>
                                    <label>Username</label>
                                    <input type="text" name="username" className={this.state.errUsername === false ? "form-control" : "form-control is-invalid"} onChange={this.changeHandler} />
                                    {this.state.errUsername === true ?
                                        <div className="red-text">
                                            Username is required!
                                        </div> : null}
                                    <label>Email</label>
                                    <input type="email" name="email" className={this.state.errEmail === false && this.state.EmailisValid === true ? "form-control" : "form-control is-invalid"} onChange={this.changeHandler} />
                                    {this.state.errEmail === true ?
                                        <div className="red-text">
                                            Email is required!
                                        </div> : null}
                                    {this.state.EmailisValid === false ?
                                        <div className="red-text">
                                            Email is Invalid
                                        </div> : null}
                                    <label>Password</label>
                                    <input type="password" name="password" className={this.state.errPassword === false ? "form-control" : "form-control is-invalid"} onChange={this.changeHandler} />
                                    {this.state.errPassword === true ?
                                        <div className="red-text">
                                            Password is required!
                                        </div> : null}
                                    <label>Confirm Password</label>
                                    <input type="password" name="confirmpassword" className={this.state.errConfirmPasswrod === false && this.state.errPasswordMatch === false ? "form-control" : "form-control is-invalid"} onChange={this.changeHandler} />
                                    {this.state.errConfirmPasswrod === true ?
                                        <div className="red-text">
                                            Confirm Password is required!
                                        </div> : null}
                                    {this.state.errPasswordMatch === true ?
                                        <div className="red-text">
                                            Confirm Password Didnt Match
                                        </div> : null}
                                    <div className="text-right py-4 mt-3">
                                        <Link className="info-text" to="/"><MDBBtn outline color="info" >Back </MDBBtn></Link>
                                        <MDBBtn outline color="info" onClick={this.submitHandler}>
                                            Register
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
