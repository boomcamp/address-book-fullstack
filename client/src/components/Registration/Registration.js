import React from "react";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
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
  border-radius: 10px;
  display: flex;
  border: 1px solid grey;
  padding: 50px;
`;

export default class Registration extends React.Component {
  render() {
    return (
      <Div>
        <MDBRow>
          <Form>
            <form onSubmit={e => this.props.RegisterHandler(e)}>
              <p
                className="h4 text-center mb-7"
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
                onChange={username =>
                  this.props.myUsernameHandler(username.target.value)
                }
                type="text"
                id="defaultFormRegisterUserNameEx"
                placeholder="Your username"
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
                onChange={email =>
                  this.props.myEmailHandler(email.target.value)
                }
                type="email"
                id="materialFormLoginConfirmEx3"
                className="form-control"
                name="email"
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
                type="password"
                id="password"
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={password =>
                  this.props.myPasswordHandler(password.target.value)
                }
                required
              />

              <br />
              <label htmlFor="password" className="grey-text">
                Re-type password
              </label>
              <input
                type="password"
                id="password1"
                className="form-control"
                placeholder="Confirm your password"
                onChange={confirmPassword =>
                  this.props.confirmPasswordHandler(
                    confirmPassword.target.value
                  )
                }
                required
              />
              <div className="text-center mt-4">
                <MDBBtn className="submit" color="indigo" type="submit">
                  Register
                </MDBBtn>
              </div>
            </form>
          </Form>
        </MDBRow>
      </Div>
    );
  }
}
