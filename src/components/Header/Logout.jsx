import React from "react";
import { useHistory } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
//import { makeStyles } from "@material-ui/core/styles";

function Logout(props) {
  // const useStyles = makeStyles(theme => ({
  //   logoutBtn: {
  //     color: "#f19208"
  //   }
  // }));

  // const classes = useStyles();
  const history = useHistory();

  const LogoutFn = () => {
    history.push("/");
    localStorage.removeItem('token');
    localStorage.removeItem('sessionid');
    props.clearState()
  };

  return (
    <React.Fragment>
      { 
       (localStorage.getItem('sessionid') && localStorage.getItem('token')) &&  
        <MenuItem color="inherit" onClick={LogoutFn}>Logout</MenuItem>
      }
    </React.Fragment>
  );
}

export default Logout;
