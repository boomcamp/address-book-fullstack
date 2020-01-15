import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from './Navbar';
import Account from './AddressBookUsers/Account';
import Profile from './AddressBookUsers/Profile';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: 'column',
        margin: "auto"
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        width: 1366,
        margin: 'auto'
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
                    <Account />
                </div>
            </div>
        </React.Fragment>
    );
}