import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.props.clickToOpen2}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this group"}
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              No
            </Button>
            <Button onClick={this.props.groupName} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
