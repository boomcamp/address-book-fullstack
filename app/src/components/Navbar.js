import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
    width: {
        display: "flex",
        width: 1366,
        margin: "auto"
    }
}));

export default function Navbar() {
    const classes = useStyles();

    return (
        <AppBar>
            <Toolbar>
                <div className={classes.width}>
                    <Typography variant="h6" className={classes.title}>
                        Address Book
                        </Typography>
                    <Button color="inherit">Login</Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}