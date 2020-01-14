import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MDBBtn, MDBCol, MDBRow } from "mdbreact";

export default class Modal extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.ClickOpen}
          onClose={this.props.ClickClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Edit Contact"}</DialogTitle>
          <MDBCol>
            <form onSubmit={this.props.editHandler}>
              <DialogContent
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <MDBRow>
                  <MDBCol>
                    <label>First Name</label>
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="Your first name.."
                      onChange={this.props.myChangeHandler}
                      required
                    />
                  </MDBCol>

                  <MDBCol>
                    <label>Last Name</label>
                    <input
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder="Your last name.."
                      onChange={this.props.myChangeHandler}
                      required
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <label>Home Phone</label>
                    <input
                      type="text"
                      id="home_phone"
                      name="homePhone"
                      placeholder="Your home phone number.."
                      onChange={this.props.myChangeHandler}
                      required
                    />
                  </MDBCol>
                  <MDBCol>
                    <label>Mobile Phone</label>
                    <input
                      type="text"
                      id="mobile_phone"
                      name="mobilePhone"
                      placeholder="Your mobile phone number.."
                      onChange={this.props.myChangeHandler}
                      required
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <label>Work Phone</label>
                    <input
                      type="text"
                      id="work_phone"
                      name="workPhone"
                      placeholder="Your work phone number.."
                      onChange={this.props.myChangeHandler}
                      required
                    />
                  </MDBCol>
                  <MDBCol>
                    <label>Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your email address.."
                      onChange={this.props.myChangeHandler}
                      required
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <label>City Name</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="City.."
                      onChange={this.props.myChangeHandler}
                      required
                    />
                  </MDBCol>
                  <MDBCol>
                    <label>State/Province</label>
                    <input
                      type="text"
                      id="state_or_province"
                      name="state_or_province"
                      placeholder="Your state or province.."
                      onChange={this.props.myChangeHandler}
                      required
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <label>Postal Code</label>
                    <input
                      type="number"
                      id="postal_code"
                      name="postalCode"
                      placeholder="Your postal code.."
                      onChange={this.props.myChangeHandler}
                      required
                    />
                  </MDBCol>
                  <MDBCol>
                    <label>Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      placeholder="Your country.."
                      onChange={this.props.myChangeHandler}
                      required
                    />
                  </MDBCol>
                </MDBRow>
                <div className="text-center mt-4">
                  <MDBBtn className="submit" color="indigo" type="submit">
                    Edit
                  </MDBBtn>
                </div>
              </DialogContent>
            </form>
          </MDBCol>
          <DialogActions>
            <Button onClick={this.props.ClickClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
