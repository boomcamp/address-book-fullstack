import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MDBRow, MDBCol, MDBCardBody } from "mdbreact";
import { Div } from "../Styled-Component/style";

export default class Edit extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      handleChange,
      handleCloseEdit,
      editContact,
      toggleEdit,
      rowValue
    } = this.props;
    return (
      <Div>
        <Dialog
          open={toggleEdit}
          onClose={handleCloseEdit}
          maxWidth={"md"}
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-title">{"Edit Contact"}</DialogTitle>
          <form onSubmit={e => editContact(e, rowValue)}>
            <MDBCol>
              <MDBCardBody>
                <div className="grey-text">
                  <MDBRow>
                    <MDBCol md="6" className="mb-3">
                      <label className="grey-text">First Name</label>
                      <input
                        defaultValue={rowValue ? rowValue.first_name : ""}
                        name="first_name"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="6" className="mb-3">
                      <label className="grey-text">Last Name</label>
                      <input
                        defaultValue={rowValue ? rowValue.last_name : ""}
                        name="last_name"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="8" className="mb-3">
                      <label className="grey-text">Email</label>
                      <input
                        defaultValue={rowValue ? rowValue.email : ""}
                        name="email"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4" className="mb-3">
                      <label className="grey-text">Home Phone</label>
                      <input
                        defaultValue={rowValue ? rowValue.home_phone : ""}
                        name="home_phone"
                        onChange={handleChange}
                        type="number"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label className="grey-text">Mobile Phone</label>
                      <input
                        defaultValue={rowValue ? rowValue.mobile_phone : ""}
                        name="mobile_phone"
                        onChange={handleChange}
                        type="number"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                      <label className="grey-text">Work Phone</label>
                      <input
                        defaultValue={rowValue ? rowValue.work_phone : ""}
                        name="work_phone"
                        onChange={handleChange}
                        type="number"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="3" className="mb-3">
                      <label className="grey-text">City</label>
                      <input
                        defaultValue={rowValue ? rowValue.city : ""}
                        name="city"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                      <label className="grey-text">State or Province</label>
                      <input
                        defaultValue={
                          rowValue ? rowValue.state_or_province : ""
                        }
                        name="state_or_province"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                      <label className="grey-text">Postal Code</label>
                      <input
                        defaultValue={rowValue ? rowValue.postal_code : ""}
                        name="postal_code"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        required
                      />
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                      <label className="grey-text">Country</label>
                      <input
                        defaultValue={rowValue ? rowValue.country : ""}
                        name="country"
                        onChange={handleChange}
                        type="text"
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
                  <Button onClick={handleCloseEdit} color="primary" autoFocus>
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
