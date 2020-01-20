import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBCardHeader,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import { Link, Switch, Route } from "react-router-dom";
import { Div, H3, Foot, Box, Item } from "../Styled-Component/style";

export default class SignUp extends React.Component {
  render() {
    return (
      <Div>
        <MDBCol md="3">
          <Box>
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={e => this.props.myhandleSignup(e)}>
                  <MDBCardHeader className="form-header deep-blue-gradient rounded">
                    <H3 className="my-3 center">Sign Up</H3>
                  </MDBCardHeader>
                  <div className="grey-text">
                    <MDBRow>
                      <Item>
                        <MDBInput
                          label="First Name"
                          type="text"
                          required
                          id="first_name"
                          onChange={e =>
                            this.props.myhandleChange(
                              e.target.value,
                              "first_name"
                            )
                          }
                        />
                      </Item>
                      <Item>
                        <MDBInput
                          label="Last Name"
                          type="text"
                          required
                          id="last_name"
                          onChange={e =>
                            this.props.myhandleChange(
                              e.target.value,
                              "last_name"
                            )
                          }
                        />
                      </Item>
                    </MDBRow>
                    <MDBRow>
                      <Item>
                        <MDBInput
                          label="Username"
                          type="text"
                          required
                          id="username"
                          onChange={e =>
                            this.props.myhandleChange(
                              e.target.value,
                              "username"
                            )
                          }
                        />
                      </Item>
                      <Item>
                        <MDBInput
                          label="Email"
                          type="email"
                          required
                          id="email"
                          onChange={e =>
                            this.props.myhandleChange(e.target.value, "email")
                          }
                        />
                      </Item>
                    </MDBRow>
                    <MDBRow>
                      <Item>
                        <MDBInput
                          label="Password"
                          type="password"
                          required
                          id="password"
                          onChange={e =>
                            this.props.myhandleChange(
                              e.target.value,
                              "password"
                            )
                          }
                        />
                      </Item>
                      <Item>
                        <MDBInput
                          label="Re-enter password"
                          type="password"
                          required
                          id="repassword"
                          className={
                            this.props.passconfirm === ""
                              ? ""
                              : !this.props.passconfirm
                              ? "is-valid"
                              : "is-invalid"
                          }
                          onChange={e =>
                            this.props.myhandleChange(
                              e.target.value,
                              "repassword"
                            )
                          }
                        />
                      </Item>
                    </MDBRow>
                  </div>
                  <div className="text-center">
                    <MDBBtn type="submit" color="info">
                      Register
                    </MDBBtn>
                  </div>
                  <Foot className="text-right">
                    Already have an account? <Link to="/"> Login Now!!</Link>
                    <Switch>
                      <Route />
                    </Switch>
                  </Foot>
                </form>
              </MDBCardBody>
            </MDBCard>
          </Box>
        </MDBCol>
      </Div>
    );
  }
}
