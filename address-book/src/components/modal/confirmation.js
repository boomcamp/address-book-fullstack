import React, { Component } from 'react'
import {
    Dialog,
    DialogActions,
    DialogTitle,
    TextField,
    DialogContent
  } from "@material-ui/core";
export default class Confirmation extends Component {
    render() {
        return (
           <React.Fragment>
                <div>
                    <Dialog
                     
                     maxWidth="xs"
                     open={this.props.openMods}
                     onClose={this.props.handleCloseMods}
                     aria-labelledby="form-dialog-title"
                     placement="top"
                    >
                        <DialogTitle>Confirmatiion for Remove</DialogTitle>
                        <button onClick={() => this.props.handleCloseMods()}>
                            close
                        </button>
                    </Dialog>
                </div>
           </React.Fragment>
        )
    }
}
