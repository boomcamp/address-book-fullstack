import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function Profile() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
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