import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function PopUpModal({ children, closeFn, open, title }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down(481));

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={closeFn}
            >
                <DialogTitle style={{background:`#4c6572`, color:`white`}}>{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>

                <DialogActions style={{background:`#e1e2e1`}}>
                    <Button autoFocus onClick={closeFn} style={{color:`black`}}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}