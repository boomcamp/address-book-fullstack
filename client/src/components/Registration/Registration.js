import React from "react";
import { Link } from "react-router-dom";
import { MDBCol, MDBRow, MDBCard, MDBBtn } from "mdbreact";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;
  width: 100%;
`;

export default class Registration extends React.Component {
  render() {
    const { changeHandler, handleSignUp } = this.props;
    return (
      <Div>
        <MDBCard>
          <div className="header pt-3 grey lighten-2">
            <MDBRow className="d-flex justify-content-start">
              <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                Sign Up Here!
              </h3>
            </MDBRow>
          </div>
          <div style={{ padding: "20px" }}>
            <form
              className="needs-validation"
              onSubmit={handleSignUp}
              noValidate
            >
              <MDBRow>
                <MDBCol md="6" className="mb-3">
                  <label htmlFor="fname" className="grey-text">
                    First name
                  </label>
                  <input
                    name="fname"
                    onChange={changeHandler}
                    type="text"
                    id="fname"
                    className="form-control"
                    placeholder="First name"
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid first name.
                  </div>
                  <div className="valid-feedback">Looks good!</div>
                </MDBCol>
                <MDBCol md="6" className="mb-3">
                  <label htmlFor="lname" className="grey-text">
                    Last name
                  </label>
                  <input
                    name="lname"
                    onChange={changeHandler}
                    type="text"
                    id="lname"
                    className="form-control"
                    placeholder="Last name"
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid last name.
                  </div>
                  <div className="valid-feedback">Looks good!</div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12" className="mb-3">
                  <label htmlFor="username" className="grey-text">
                    Username
                  </label>
                  <input
                    onChange={changeHandler}
                    type="text"
                    id="username"
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid username.
                  </div>
                  <div className="valid-feedback">Looks good!</div>
                </MDBCol>
                <MDBCol md="12" className="mb-3">
                  <label htmlFor="email" className="grey-text">
                    Email
                  </label>
                  <input
                    onChange={changeHandler}
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    placeholder="Your Email address"
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid email.
                  </div>
                  <div className="valid-feedback">Looks good!</div>
                </MDBCol>
                <MDBCol md="6" className="mb-3">
                  <label htmlFor="password" className="grey-text">
                    Password
                  </label>
                  <input
                    name="password"
                    onChange={changeHandler}
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                  <div className="invalid-feedback">Invalid Password.</div>
                  <div className="valid-feedback">Looks good!</div>
                </MDBCol>
                <MDBCol md="6" className="mb-3">
                  <label htmlFor="cpassword" className="grey-text">
                    Confirm Password
                  </label>
                  <input
                    name="cpassword"
                    onChange={changeHandler}
                    type="password"
                    id="cpassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    required
                  />
                  <div className="invalid-feedback">Password Don't Match</div>
                  <div className="valid-feedback">Looks good!</div>
                </MDBCol>{" "}
              </MDBRow>
              <div className="text-center mb-4 mt-3">
                <MDBBtn
                  gradient="blue"
                  className="btn-block z-depth-2"
                  type="submit"
                >
                  Sign Up
                </MDBBtn>
              </div>
              <Link to="/">
                <p className="font-small grey-text d-flex justify-content-center">
                  Already have an account?{" "}
                  <span className="dark-grey-text font-weight-bold ml-1">
                    Sign In
                  </span>
                </p>
              </Link>{" "}
            </form>
          </div>
        </MDBCard>
      </Div>
    );
  }
}
