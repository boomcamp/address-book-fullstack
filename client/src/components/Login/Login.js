import React from "react";
import { Link } from "react-router-dom";
import { MDBRow, MDBBtn } from "mdbreact";
import styled from "styled-components";
import { TextField } from "@material-ui/core";

const Div = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: inline-block;
  border: 1px solid grey;
  padding: 30px;
`;

const Input = styled.div``;

export default class Login extends React.Component {
  render() {
    return (
      <Div>
        <MDBRow>
          <Form>
            <form onSubmit={this.props.mySubmitHandler}>
              <p className="h4 text-center mb-4">Sign in</p>

              <Input>
                <TextField
                  name="username"
                  onChange={this.props.myChangeHandler}
                  type="text"
                  variant="outlined"
                  id="defaultFormRegisterConfirmEx3"
                  className="form-control"
                  label="Your Username"
                  required
                  style={{
                    margin: "5px"
                  }}
                />
              </Input>
              <br />

              <Input>
                <TextField
                  name="password"
                  onChange={this.props.myChangeHandler}
                  type="password"
                  variant="outlined"
                  id="defaultFormLoginPasswordEx"
                  className="form-control"
                  label="Your Password"
                  required
                  style={{
                    margin: "5px"
                  }}
                />
              </Input>
              <div className="text-center mt-4">
                <MDBBtn
                  color="indigo"
                  type="submit"
                  style={{
                    borderRadius: 10
                  }}
                  value="Log In"
                >
                  Sign In
                </MDBBtn>
              </div>
              <div className="text-center register">
                Don't have an account yet?
                <br />
                <MDBBtn
                  className="btn-register"
                  color="white"
                  style={{
                    borderRadius: 10
                  }}
                >
                  <Link
                    to="/register"
                    onClick={() => this.props.redirectHandler()}
                  >
                    Sign up here
                  </Link>
                </MDBBtn>
              </div>
            </form>
          </Form>
        </MDBRow>
      </Div>
    );
  }
}
