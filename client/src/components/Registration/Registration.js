import React from "react";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Link } from "react-router-dom";
import { MDBRow, MDBBtn } from "mdbreact";
import styled from "styled-components";

const Div = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Form = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: inline-block;
  border: 1px solid grey;
  border-radius: 10px;
`;
export default class Registration extends React.Component {
  render() {
    return (
      <Div>
        <MDBRow>
          <div className="container-fluid">
            <div className="row">
              <Form>
                <form onSubmit={this.props.RegisterHandler}>
                  <p
                    className="h4 text-center"
                    style={{
                      color: "black"
                    }}
                  >
                    Sign up
                  </p>
                  <label
                    htmlFor="defaultFormRegisterUserNameEx"
                    className="grey-text"
                  >
                    Your username
                  </label>
                  <input
                    name="username"
                    onChange={this.props.myChangeHandler}
                    type="text"
                    id="defaultFormRegisterUserNameEx"
                    placeholder="Your username"
                    className="form-control"
                    required
                  />
                  <br />
                  <label htmlFor="firstName" className="grey-text">
                    Your First Name
                  </label>
                  <input
                    name="fname"
                    onChange={this.props.myChangeHandler}
                    type="text"
                    id="firstName"
                    placeholder="Your First Name"
                    className="form-control"
                    required
                  />
                  <br />
                  <label htmlFor="lastName" className="grey-text">
                    Your Last Name
                  </label>
                  <input
                    name="lname"
                    onChange={this.props.myChangeHandler}
                    type="text"
                    id="lastName"
                    placeholder="Your Last Name"
                    className="form-control"
                    required
                  />
                  <br />
                  <label
                    htmlFor="materialFormRegisterConfirmEx3"
                    className="grey-text"
                  >
                    Your email
                  </label>
                  <input
                    name="email"
                    onChange={this.props.myChangeHandler}
                    type="email"
                    id="materialFormLoginConfirmEx3"
                    className="form-control"
                    placeholder="Your Email address"
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid email.
                  </div>
                  <div className="valid-feedback">Looks good!</div>
                  <br />
                  <label htmlFor="password" className="grey-text">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={this.props.myChangeHandler}
                    required
                  />

                  <br />
                  <label htmlFor="password" className="grey-text">
                    Re-type password
                  </label>
                  <input
                    name="plainPassword"
                    type="password"
                    id="password1"
                    className="form-control"
                    placeholder="Confirm your password"
                    onChange={this.props.myChangeHandler}
                    required
                  />
                  <div className="text-center mt-4">
                    <MDBBtn className="submit" color="indigo" type="submit">
                      Register
                    </MDBBtn>
                  </div>
                  <div className="text-center register">
                    Already have an account yet?
                    <br />
                    <MDBBtn
                      className="btn-login"
                      color="white"
                      style={{
                        borderRadius: 10
                      }}
                    >
                      <Link to="/" onClick={() => this.props.redirectHandler()}>
                        Login here
                      </Link>
                    </MDBBtn>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </MDBRow>
      </Div>
    );
  }
}
