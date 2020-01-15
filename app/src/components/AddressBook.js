import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from './Navbar';
import Profile from './AddressBookUsers/Profile';

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

export default function AddressBook() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Navbar />
                <div className={classes.row}>
                    <Profile />
                </div>
            </div>
        </React.Fragment>
    );
}