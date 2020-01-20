import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { MDBRow, MDBCol, MDBCardBody } from "mdbreact";
import { Div } from "../Styled-Component/style";

export default class Modal extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { handleChange, handleCloseAdd, toggleAdd, addContact } = this.props;
    return (
      <Div>
        <Dialog
          open={toggleAdd}
          onClose={handleCloseAdd}
          maxWidth={"md"}
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-title">{"Add Contact"}</DialogTitle>
          <form onSubmit={addContact}>
            <MDBCol>
              <MDBCardBody>
                <div className="grey-text">
                  <MDBRow>
                    <MDBCol md="6" className="mb-3">
                      <label className="grey-text">First Name</label>
                      <input
                        value={this.state.first_name}
                        name="first_name"
                        onChange={handleChange}
                        type="text"
                        id="first_name"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="6" className="mb-3">
                      <label className="grey-text">Last Name</label>
                      <input
                        value={this.state.last_name}
                        name="last_name"
                        onChange={handleChange}
                        type="text"
                        id="last_name"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="8" className="mb-3">
                      <label className="grey-text">Email</label>
                      <input
                        value={this.state.email}
                        name="email"
                        onChange={handleChange}
                        type="text"
                        id="email"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="mb-3">
                      <label className="grey-text">Home Phone</label>
                      <input
                        value={this.state.home_phone}
                        name="home_phone"
                        onChange={handleChange}
                        type="number"
                        id="home_phone"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label className="grey-text">Mobile Phone</label>
                      <input
                        value={this.state.mobile_phone}
                        name="mobile_phone"
                        onChange={handleChange}
                        type="number"
                        id="mobile_phone"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label className="grey-text">Work Phone</label>
                      <input
                        value={this.state.work_phone}
                        name="work_phone"
                        onChange={handleChange}
                        type="number"
                        id="work_phone"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="3" className="mb-3">
                      <label className="grey-text">City</label>
                      <input
                        value={this.state.city}
                        name="city"
                        onChange={handleChange}
                        type="text"
                        id="city"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                      <label className="grey-text">State or Province</label>
                      <input
                        value={this.state.state_or_province}
                        name="state_or_province"
                        onChange={handleChange}
                        type="text"
                        id="state_or_province"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                      <label className="grey-text">Postal Code</label>
                      <input
                        value={this.state.postal_code}
                        name="postal_code"
                        onChange={handleChange}
                        type="text"
                        id="postal_code"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                      <label className="grey-text">Country</label>
                      <input
                        value={this.state.country}
                        name="country"
                        onChange={handleChange}
                        type="text"
                        id="country"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                  </MDBRow>
                </div>
                <DialogActions>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                  <Button onClick={handleCloseAdd} color="primary" autoFocus>
                    Cancel
                  </Button>
                </DialogActions>
              </MDBCardBody>
            </MDBCol>
          </form>
        </Dialog>
      </Div>
    );
  }
}
