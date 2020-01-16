import React, { useState, useEffect } from "react";
import { MuiThemeProvider,createMuiTheme,makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Logout from './Logout';
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import { Menu, MoreVert, Search } from '@material-ui/icons';
import Hidden from '@material-ui/core/Hidden';
import { MenuItem } from '@material-ui/core';

function Header() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#1d1d23',
      },
      secondary: {
        main: '#c0301b',
      },
    },
  });

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

  const classes = useStyles();

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
    <MuiThemeProvider theme={theme}>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Hidden only={['xl', 'lg']}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton> 
          </Hidden>    
          <Typography variant="h6" className={classes.greeting}>
            { (details.user_firstName) && `Hello ${details.user_firstName}!`}
          </Typography>
          <Logout clearState={clearStateFn}/>
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <MoreVert />
          </IconButton>
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
  );
}
export default Header;
