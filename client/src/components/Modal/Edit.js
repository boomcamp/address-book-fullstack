import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MDBBtn, MDBCol } from "mdbreact";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const Form = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
const Input = styled.div`
  padding: 5px;
`;

export default class Edit extends React.Component {
  render() {
    return (
      <div>
        <Dialog open={this.props.clickOpen} onClose={this.props.clickClose}>
          <DialogTitle
            id="alert-dialog-title"
            style={{
              marginLeft: 25
            }}
          >
            {"Edit Contact"}
          </DialogTitle>
          <MDBCol>
            <form onSubmit={this.props.editHandler}>
              <DialogContent
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Form>
                  <Input>
                    <TextField
                      type="text"
                      id="fname"
                      name="fname"
                      label="First Name"
                      fullWidth
                      onChange={this.props.myChangeHandler1}
                    />
                  </Input>

                  <Input>
                    <TextField
                      label="Last Name"
                      type="text"
                      id="lname"
                      name="lname"
                      fullWidth
                      onChange={this.props.myChangeHandler1}
                    />
                  </Input>
                </Form>
                <Form>
                  <Input>
                    <TextField
                      label="Home Phone Number"
                      type="number"
                      id="home_phone"
                      name="homePhone"
                      onChange={this.props.myChangeHandler}
                      fullWidth
                    />
                  </Input>
                  <Input>
                    <TextField
                      label="Mobile Phone Number"
                      type="number"
                      id="mobile_phone"
                      name="mobilePhone"
                      onChange={this.props.myChangeHandler1}
                      fullWidth
                    />
                  </Input>
                </Form>
                <Form>
                  <Input>
                    <TextField
                      label="Work Phone Number"
                      type="number"
                      id="work_phone"
                      name="workPhone"
                      onChange={this.props.myChangeHandler1}
                      fullWidth
                    />
                  </Input>
                  <Input>
                    <TextField
                      label="Email Address"
                      type="email"
                      id="email"
                      name="email"
                      onChange={this.props.myChangeHandler1}
                      fullWidth
                    />
                  </Input>
                </Form>
                <Form>
                  <Input>
                    <TextField
                      label="City"
                      type="text"
                      id="city"
                      name="city"
                      onChange={this.props.myChangeHandler1}
                      fullWidth
                    />
                  </Input>
                  <Input>
                    <TextField
                      label="State or Province"
                      type="text"
                      id="state_or_province"
                      name="state_or_province"
                      onChange={this.props.myChangeHandler1}
                      fullWidth
                    />
                  </Input>
                </Form>
                <Form>
                  <Input>
                    <TextField
                      label="Postal Code"
                      type="number"
                      id="postal_code"
                      name="postalCode"
                      onChange={this.props.myChangeHandler1}
                      fullWidth
                    />
                  </Input>
                  <Input>
                    <TextField
                      label="Country"
                      type="text"
                      id="country"
                      name="country"
                      onChange={this.props.myChangeHandler1}
                      fullWidth
                    />
                  </Input>
                </Form>
                <div className="text-center mt-4">
                  <MDBBtn className="submit" color="indigo" type="submit">
                    Edit
                  </MDBBtn>
                </div>
              </DialogContent>
            </form>
          </MDBCol>
          <DialogActions>
            <Button onClick={this.props.clickClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
