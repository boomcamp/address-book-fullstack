import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 20
    },
    paper: {
        padding: theme.spacing(2),
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Profile() {
    const classes = useStyles();
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios({
                method: 'get',
                url: `http://localhost:3001/api/contacts`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => {
                    setUsers([data.data])
                    console.log(data.data)
                })
                .catch(e => console.log(e))
        } else {
            window.location.href = "/"
        }
    }, []);

    return (
        <React.Fragment>
            <div className={classes.root}>
                ADD USER
                <Grid container spacing={3} direction='row' justify="center" alignItems="center">

                </Grid>
            </div>
        </React.Fragment>
    );
}