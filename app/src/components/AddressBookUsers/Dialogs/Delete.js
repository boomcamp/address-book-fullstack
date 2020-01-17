import React from 'react';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export default function Delete({ openDelete, deleteClose }) {
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={openDelete}
            onClose={deleteClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button onClick={deleteClose} autoFocus color="primary">
                    Cancel
                </Button>
                <Button onClick={deleteClose} autoFocus color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}