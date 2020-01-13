import React from "react";
import { Link } from "react-router-dom";
import { MDBRow, MDBBtn } from "mdbreact";
import styled from "styled-components";

const Div = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Form = styled.div`
  border-radius: 10px;
  display: flex;
  border: 1px solid grey;
  padding: 50px;
`;

export default class Login extends React.Component {
  render() {
    return (
      <Div>
        <MDBRow>
          <Form>
            <form onSubmit={this.props.mySubmitHandler}>
              <p className="h4 text-center mb-4">Sign in</p>
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Your username
              </label>
              <input
                name="username"
                onChange={this.props.myChangeHandler}
                type="text"
                id="defaultFormRegisterConfirmEx3"
                className="form-control"
                placeholder="Your Username"
                required
              />

              <br />
              <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                Your password
              </label>
              <input
                name="password"
                onChange={this.props.myChangeHandler}
                type="password"
                id="defaultFormLoginPasswordEx"
                className="form-control"
                placeholder="Your Password"
                required
              />
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
