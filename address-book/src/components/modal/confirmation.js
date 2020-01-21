import React, { Component } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  DialogContent,
  Button
} from "@material-ui/core";
export default class Confirmation extends Component {

  render() {

    return (
      <React.Fragment>
        <DialogTitle>Confirmatiion for Remove</DialogTitle>
        <DialogActions>
        <Button color="primary" onClick={() => this.props.handleCloseMods()}>
            No
          </Button>
          <Button color="primary"onClick={() => this.props.handleRemoveYes()} >Yes</Button>
   
        </DialogActions>
      </React.Fragment>
    );
  }
}
