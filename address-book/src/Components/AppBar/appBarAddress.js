import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  appBar: { backgroundColor: "#065786d9" }
}));

const logout = () => {
  Swal.fire(`Logged out Successfully!`).then(function() {
    window.location = "/";
    localStorage.clear();
  });
};

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            Address Book
          </Typography>
          <div>
            <Button color="inherit" onClick={logout}>
              Log out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
