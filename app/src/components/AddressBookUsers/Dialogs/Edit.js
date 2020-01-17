import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

// import axios from 'axios';

export default function Edit({ openEdit, editClose, Transition }) {
    const classes = useStyles();

    const onSave = () => {

    }

    return (
        <Dialog
            fullScreen
            open={openEdit}
            onClose={editClose}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Edit User
                    </Typography>
                    <Button autoFocus color="inherit" onClick={onSave}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent>

            </DialogContent>
        </Dialog>
    );
}

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    }
}));