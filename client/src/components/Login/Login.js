import React from "react";
import { Link } from "react-router-dom";
import { MDBRow, MDBCard, MDBBtn, MDBCol } from "mdbreact";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 60px;
`;

class Login extends React.Component {
  render() {
    const { handleReg, submitHandler, changeHandler } = this.props;
    return (
      <Div>
        <MDBCard>
          <div className="header pt-3 grey lighten-2">
            <MDBRow className="d-flex justify-content-start">
              <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Log in</h3>
            </MDBRow>
          </div>
          <div style={{ padding: "20px" }}>
            <form
              className="needs-validation"
              onSubmit={submitHandler}
              noValidate
            >
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
                    placeholder="Your Username"
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid username.
                  </div>
                  <div className="valid-feedback">Looks good!</div>
                </MDBCol>
                <MDBCol md="12" className="mb-3">
                  <label htmlFor="password" className="grey-text">
                    Password
                  </label>
                  <input
                    onChange={changeHandler}
                    type="password"
                    id="password"
                    className="form-control"
                    name="password"
                    placeholder="Your Password"
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid password.
                  </div>
                  <div className="valid-feedback">Looks good!</div>
                </MDBCol>
              </MDBRow>
              <div className="text-center mb-4 mt-5">
                <MDBBtn
                  gradient="blue"
                  type="submit"
                  className="btn-block z-depth-2"
                >
                  Log in
                </MDBBtn>
              </div>
              <Link to="/register">
                <p
                  className="font-small grey-text d-flex justify-content-center"
                  onClick={handleReg}
                >
                  Don't have an account?{" "}
                  <span className="dark-grey-text font-weight-bold ml-1">
                    Sign up
                  </span>
                </p>
              </Link>{" "}
            </form>{" "}
          </div>
        </MDBCard>
      </Div>
    );
  }
}

export default Login;
