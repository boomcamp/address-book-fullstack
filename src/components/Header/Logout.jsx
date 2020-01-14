import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

function Logout(props) {
  const useStyles = makeStyles(theme => ({
    logoutBtn: {
      color: "#f19208"
    }
  }));

  const classes = useStyles();
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
        <Button className={classes.logoutBtn} color="inherit" onClick={LogoutFn}>
          Logout
        </Button>
      }
    </React.Fragment>
  );
}

export default Logout;
