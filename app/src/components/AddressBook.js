import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from './Navbar';
import Profile from './AddressBookUsers/Profile';

export default function AddressBook() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const menuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const menuClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Navbar />
                <div className={classes.row}>
                    <Profile
                        handleClickOpen={handleClickOpen}
                        handleClose={handleClose}
                        open={open}
                        anchorEl={anchorEl}
                        menuOpen={menuOpen}
                        menuClose={menuClose}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: 'column',
        margin: "auto"
    },
    row: {
        display: 'flex',
        justifyContent: 'center'
    }
}));