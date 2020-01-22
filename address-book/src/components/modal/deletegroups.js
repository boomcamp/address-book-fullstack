import React, { Component } from 'react'
import {
    Dialog,
    DialogActions,
    Button,
    DialogContent,DialogContentText
    

  } from "@material-ui/core";
export default class Deletegroups extends Component {
    render() {
        return (
            <React.Fragment>
                <div>

            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to Delete this Group?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.props.handleCloseDelete} color="primary" autoFocus>
                No
              </Button>
              <Button onClick={this.props.handleYesDelete} color="primary">
                Yes
              </Button>
          
            </DialogActions>
                </div>
            </React.Fragment>
        )
    }
}
