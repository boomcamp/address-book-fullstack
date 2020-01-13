import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center'
    },
    width: {
        display: "flex",
        width: 1366,
        margin: "auto",
        padding: 20
    }
}));

export default function Profiles() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.width}>
                <h1>Profile Lists</h1>
            </div>
        </div>
    );
}