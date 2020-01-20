import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MDBCol, MDBCardBody } from "mdbreact";
import { Div } from "../Styled-Component/style";

export default class Edit extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { deleteContact, handleCloseDel, toggleDel, rowValue } = this.props;
    return (
      <Div>
        <Dialog
          open={toggleDel}
          onClose={handleCloseDel}
          maxWidth={"sm"}
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-title">{"Delete Contact"}</DialogTitle>
          <form onSubmit={e => deleteContact(e, rowValue)}>
            <MDBCol>
              <MDBCardBody>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure that you want to DELETE this contact?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button type="submit" color="primary">
                    Yes
                  </Button>
                  <Button onClick={handleCloseDel} color="primary" autoFocus>
                    No
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
