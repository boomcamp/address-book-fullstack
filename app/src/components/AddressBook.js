import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from './Navbar';

export default function AddressBook() {
    const classes = useStyles();


    return (
        <React.Fragment>
            <div className={classes.root}>
                <Navbar />
            </div>
        </React.Fragment>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: 'column',
        margin: "auto"
    }
}));