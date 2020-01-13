import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {},
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            Address Book
          </Typography>
          <div>
            <Button color="inherit" href="/signin">
              Sign in
            </Button>
            <Button color="inherit" href="/signup">
              Sign up
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
