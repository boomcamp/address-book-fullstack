import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle'; 
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Logout from './Logout';
import { useHistory } from "react-router-dom";

import axios from 'axios';
import LeftDrawer from './LeftDrawer/LeftDrawer';
const useStyles = makeStyles(theme => ({
  greeting: {
    flexGrow: 1, 
    fontSize: '1.2rem', 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center'
  }
}));

export default function Header({displayContacts, displayGroups}) {
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

  const greetFn = (name) => {
    let hour = new Date().getHours();
    if(name){
      if(hour >= 0 && hour <= 11){
        return `Good Morning ${name}!`;
      }else if(hour >= 12 && hour <= 17){
        return `Good Afternoon ${name}!`;
      }else{
        return `Good Evening ${name}!`;
      }
    }
    return null;
  }

  const clearStateFn = () => {
    setDetails({});
  }

  const history = useHistory();

  useEffect(() => {
    if(history.location.pathname === "/" || history.location.pathname === "/dashboard"){
      if(localStorage.getItem('token') && localStorage.getItem('sessionid')){
        history.push("/dashboard");
        userDetailsFn();
      }else{
        history.push("/");
      }
    }else if(history.location.pathname === "/register" && localStorage.getItem('sessionid') && localStorage.getItem('token')){
      history.push("/dashboard")
    }
  }, [history])

  return (
    <AppBar position="static">
      <Toolbar>
        { (localStorage.getItem('sessionid') && localStorage.getItem('token')) &&
          <LeftDrawer displayContacts={displayContacts} displayGroups={displayGroups} name={(details.user_firstName && details.user_lastName) && details.user_firstName+" "+details.user_lastName} />
        }
        <Typography variant="h6" className={classes.greeting}>
          { greetFn((details.user_firstName) && details.user_firstName) }
        </Typography>
        { (localStorage.getItem('sessionid') && localStorage.getItem('token')) && 
          <div>
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
                <Logout clearState={clearStateFn}/>
              </Menu>
          </div>
        }
      </Toolbar>
    </AppBar>
  );
}