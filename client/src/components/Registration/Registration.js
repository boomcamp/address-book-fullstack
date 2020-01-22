import React from "react";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Link } from "react-router-dom";
import { MDBRow, MDBBtn } from "mdbreact";
import styled from "styled-components";
import { TextField } from "@material-ui/core";

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
    const { validation } = this.props;
    return (
      <Div>
        <MDBRow>
          <div className="container-fluid">
            <div className="row">
              <Form>
                <form onSubmit={this.props.registerHandler}>
                  <p
                    className="h4 text-center"
                    style={{
                      color: "black"
                    }}
                  >
                    Sign up
                  </p>

                  <TextField
                    name="username"
                    onChange={this.props.myChangeHandler}
                    type="text"
                    id="defaultFormRegisterUserNameEx"
                    label="Your username"
                    variant="outlined"
                    required
                    style={{
                      margin: "5px"
                    }}
                  />
                  <br />

                  <TextField
                    name="fname"
                    onChange={this.props.myChangeHandler}
                    type="text"
                    id="firstName"
                    label="Your First Name"
                    variant="outlined"
                    required
                    style={{
                      margin: "5px"
                    }}
                  />
                  <br />

                  <TextField
                    name="lname"
                    onChange={this.props.myChangeHandler}
                    type="text"
                    id="lastName"
                    label="Your Last Name"
                    variant="outlined"
                    required
                    style={{
                      margin: "5px"
                    }}
                  />
                  <br />

                  <TextField
                    name="email"
                    onChange={this.props.myChangeHandler}
                    type="email"
                    id="materialFormLoginConfirmEx3"
                    variant="outlined"
                    label="Your Email address"
                    required
                    style={{
                      margin: "5px"
                    }}
                  />
                  <div className="invalid-feedback">
                    Please provide a valid email.
                  </div>
                  <div className="valid-feedback">Looks good!</div>
                  <br />

                  <TextField
                    name="password"
                    type="password"
                    id="password"
                    variant="outlined"
                    label="Password"
                    onChange={this.props.myChangeHandler}
                    required
                    style={{
                      margin: "5px"
                    }}
                  />

                  <br />

                  <TextField
                    error={validation.confirmPassword}
                    name="confirmPassword"
                    type="password"
                    id="password1"
                    variant="outlined"
                    label="Confirm your password"
                    onChange={this.props.myChangeHandler}
                    required
                    helperText={validation.confirmPasswordMsg}
                    style={{
                      margin: "5px"
                    }}
                  />
                  <div className="text-center mt-4">
                    <MDBBtn className="submit" color="indigo" type="submit">
                      Register
                    </MDBBtn>
                  </div>
                  <div className="text-center register">
                    Already have an account?
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
