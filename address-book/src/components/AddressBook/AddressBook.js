import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core'
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';
import UserDetails from './UserDetails';
import Groups from './Groups';
import Contacts from './Contacts';

const useStyles = makeStyles(theme => ({
    minibox:{
        marginTop: '20px',
        display: 'flex',
        '@media (max-width: 1325px)':{
            display: 'block',
        },
    },
    
}))
export default function UserManage() {
    const classes = useStyles();
    var [token, emptyToken] = useState(false)

    const logout = () =>{
        localStorage.clear();
        emptyToken(true);
    }
    if(token){
        return(<Redirect to="/login"/>)
    }
    if(!localStorage.getItem('token')){
        return(<Redirect to="/login"/>)
    }
    return (
        <React.Fragment>
            <AppBar position="static" color="default" elevation={0}>
                <Toolbar>
                    <Typography style={{flexGrow: "1"}}>
                        Address Book
                    </Typography>
                    <Button title="Logout User" size="small" variant="outlined" color="primary" onClick={logout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <div className={classes.minibox}>
                <UserDetails/>
                <Groups/>
            </div>
            <Contacts/>
        </React.Fragment>
    );
}