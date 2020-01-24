import React from 'react';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Account from './Account';

export default function AddContact({ fullScreen, open, handleClose }) {
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="add-new-contact"
        >
            <DialogTitle id="add-new-contact">{"New Contact"}</DialogTitle>
            <DialogContent>
                <Account handleClose={handleClose} />
            </DialogContent>
        </Dialog>
    );
}