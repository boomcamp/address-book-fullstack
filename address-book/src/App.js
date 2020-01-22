import React, { useState } from "react";
import {
  Route,
  Link as RouterLink,
  BrowserRouter,
  Switch,
  Redirect
} from "react-router-dom";
import {
  Button,
  CssBaseline,
  Typography,
  Container,
  AppBar,
  Toolbar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Background from "./components/Background";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AddressBook from "./components/AddressBook";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Swal from "sweetalert2";
import "./App.css";
import jwt from "jsonwebtoken";

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export default function App() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const logout = () => {
    setAnchorEl(null);
    Swal.fire(
      `Logged out Successfully!`,
      `Goodbye, ${capitalize(
        String(jwt.decode(localStorage.getItem("Token")).firstname)
      )}!`
    ).then(() => {
      window.location = "/";
      localStorage.clear();
    });
  };
  return (
    <React.Fragment>
      <Container
        component="main"
        maxWidth="xl"
        className={`${classes.noPad} ${classes.paper}`}
      >
        <CssBaseline />
        <BrowserRouter>
          <React.Fragment>
            <AppBar position="fixed">
              <Toolbar className={classes.toolbar}>
                <Typography variant="h6">Address Book</Typography>
                <Switch>
                  <Route
                    exact
                    path={["/", "/login", "/register"]}
                    render={() => (
                      <div>
                        <RouterLink
                          to="/"
                          className={classes.buttonNoDecoration}
                        >
                          <Button className={classes.white}>login</Button>
                        </RouterLink>
                        <RouterLink
                          to="/register"
                          className={classes.buttonNoDecoration}
                        >
                          <Button className={classes.white}>sign up</Button>
                        </RouterLink>
                      </div>
                    )}
                  />
                  <Route
                    path="/addressbook"
                    render={() => (
                      <div>
                        <Button
                          className={classes.white}
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={e => setAnchorEl(e.currentTarget)}
                        >
                          My account
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={() => setAnchorEl(null)}
                        >
                          <BrowserRouter>
                            <MenuItem onClick={() => logout()}>Logout</MenuItem>
                          </BrowserRouter>
                        </Menu>
                      </div>
                    )}
                  />
                </Switch>
              </Toolbar>
            </AppBar>
            {localStorage.getItem("Token") ? (
              <Redirect to="/addressbook" />
            ) : null}
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Login capitalize={capitalize} />}
              />
              <Route path="/register" component={SignUp} />
              <Route path="/addressbook" component={AddressBook} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </Container>
      <Background />
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  rooot: {
    background: "#FFF",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    left: "50%",
    top: "40%",
    position: "absolute",
    msTransform: "translate(-50%, -50%)",
    webkitTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
    zIndex: "2"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#009688"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  noPad: {
    padding: "0"
  },
  white: {
    color: "white"
  },
  buttonNoDecoration: {
    textDecoration: "none"
  }
}));
