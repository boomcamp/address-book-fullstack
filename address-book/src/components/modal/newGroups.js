import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class NewGroups extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { open, handleCloseModal } = this.props;

    return (
      <React.Fragment>
        <Dialog
          maxWidth="sm"
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Group</DialogTitle>
          <DialogContent>
            <TextField
              //   className={classes.textField}
              required
              id="standard-required"
              label="Group Name"
              value={this.props.groupName}
              onChange={e => this.props.handleTarget(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              color="primary"
              onClick={() => this.props.handleCreateGroups()}
            >
              Add
            </Button>

            <Button onClick={() => handleCloseModal()} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
