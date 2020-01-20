import React from "react";
import { useHistory } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';

function Logout(props) {
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
