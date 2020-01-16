import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle'; 
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  greeting: {
    flexGrow: 1, 
    fontSize: '1.2rem', 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center'
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [details, setDetails] = useState({});

  const userDetailsFn = () => {
    const sessionid = localStorage.getItem('sessionid');
    const token = localStorage.getItem('token');
    if(sessionid && token){  
      axios({
        method: 'get',
        url: `http://localhost:3002/api/user/${sessionid}`,
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        setDetails(response.data);
      }).catch(error => {
        console.log(error);
      })
    }
  }

  const clearStateFn = () => {
    setDetails({});
  }

  useEffect(() => {
    userDetailsFn();
    // eslint-disable-next-line
  }, [])

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.greeting}>
          { (details.user_firstName) && `Hello ${details.user_firstName}!`}
        </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
      </Toolbar>
    </AppBar>
  );
}