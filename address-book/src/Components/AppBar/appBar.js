import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  appBar: {
    backgroundColor: "#065786d9"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
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
