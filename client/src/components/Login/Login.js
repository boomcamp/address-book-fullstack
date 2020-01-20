import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {
  MDBBtn,
  MDBCol,
  MDBInput,
  MDBCardHeader,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import { Link, Switch, Route } from "react-router-dom";
import { Div, H3, Foot } from "../Styled-Component/style";

export default class Login extends React.Component {
  render() {
    return (
      <Div>
        <MDBCol md="3">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={e => this.props.myhandleLogin(e)}>
                <MDBCardHeader className="form-header deep-blue-gradient rounded">
                  <H3 className="my-3">Login</H3>
                </MDBCardHeader>
                <MDBInput
                  type="text"
                  id="username"
                  label="Username"
                  icon="user"
                  required
                  onChange={e =>
                    this.props.myhandleChange(e.target.value, "username")
                  }
                />
                <MDBInput
                  type="password"
                  id="password"
                  label="Password"
                  icon="lock"
                  required
                  onChange={e =>
                    this.props.myhandleChange(e.target.value, "password")
                  }
                />
                <div className="text-center">
                  <MDBBtn color="info" type="submit">
                    Login
                  </MDBBtn>
                </div>
                <Foot onClick={this.props.handleSuccess} className="text-right">
                  Don't have an account?{" "}
                  <Link to="/Registration"> Sign Up Here</Link>
                  <Switch>
                    <Route />
                  </Switch>
                </Foot>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </Div>
    );
  }
}
