import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { MDBCol, MDBCardBody } from "mdbreact";
import { Div } from "../Styled-Component/style";

export default class Group extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { handleChange, handleCloseGroup, toggleG, addGroup } = this.props;
    return (
      <Div>
        <Dialog open={toggleG} onClose={handleCloseGroup}>
          <form onSubmit={addGroup}>
            <MDBCol>
              <MDBCardBody>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <strong>Group Name</strong>
                  </DialogContentText>
                </DialogContent>
                <MDBCol md="15" className="mb-3">
                  <input
                    value={this.state.group_name}
                    name="group_name"
                    onChange={handleChange}
                    type="text"
                    id="group_name"
                    className="form-control"
                    required
                  />
                </MDBCol>
                <div className="text-center">
                  <Button type="submit" color="primary">
                    Create
                  </Button>
                  <Button onClick={handleCloseGroup} color="primary" autoFocus>
                    Cancel
                  </Button>
                </div>
              </MDBCardBody>
            </MDBCol>
          </form>
        </Dialog>
      </Div>
    );
  }
}
