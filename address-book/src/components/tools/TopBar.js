import React, { useState, useEffect } from 'react'
import axios from 'axios'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor: `#4B6573`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
}));


export default function TopBar({ handleOpenfn, open }) {
    const classes = useStyles();
    const [user, setUser] = useState();

    useEffect(() => {
        axios({
            method: 'get',
            url: '/api/user/' + sessionStorage.getItem('userId'),
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => setUser(res.data.username))

        return () => { };
    }, [])

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleOpenfn}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}>
                    <MenuIcon />
                </IconButton>
                <div style={{ width: `100%`, display: `flex`, justifyContent: `space-between`, alignItems: `center` }}>
                    <h2>Address Book Fullstack Project</h2>
                    <h3>Welcome, {user}!</h3>
                </div>
            </Toolbar>
        </AppBar>
    )
}
