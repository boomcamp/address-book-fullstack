import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Lock from "@material-ui/icons/Lock";
import Icon from "@material-ui/core/Icon";
import {
  TextField,
  Grid,
  Button,
  Snackbar,
  Typography,
  Toolbar,
  IconButton,
  AppBar
} from "@material-ui/core";
import axios from "axios";
const useStyles = makeStyles(theme => ({}));
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uname: "",
      pword: "",
      snackbarState: false,
      snackbarMessage: "",
      icon: ""
    };
  }
  handleCloseSnackbar = () => {
    this.setState({ snackbarState: false, snackbarMessage: "" });
  };
  handleOpenSnackbar = (message, color) => {
    this.setState({
      snackbarState: true,
      snackbarMessage: message,
      backgroundColor: color ? color : ""
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    let logout = localStorage.getItem("out") ? true : false;
    if (logout) {
      this.handleOpenSnackbar("Successfully Log out", "darkgreen");
      this.setState({
        icon: "check"
      });
      localStorage.removeItem("out");
    }

    if (localStorage.getItem("token") === null) {
    } else {
      this.props.history.push("/addressbook");
    }
  }

  setFields = event => {
    var fieldname = event.target.name;
    var fieldError = fieldname + "Error";
    var value = event.target.value;
    this.setState({
      [fieldname]: value,
      [fieldError]: value ? false : true
    });
  };
  handleLogin = event => {
    event.preventDefault();
    axios
      .post("/login", {
        username: this.state.uname,
        password: this.state.pword
      })
      .then(res => {
        if (res.data.error === undefined) {
          localStorage.setItem("auth", "logged in");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.id);
          this.props.history.push("/register");
        } else if (res.data.error === "Incorrect Password") {
          // console.log(res.data.error)
          this.handleOpenSnackbar("Incorrect password ", "#9a0707");
          this.setState({
            icon: "error"
          });
        } else if (res.data.error === "Incorrect Password") {
          this.handleOpenSnackbar("Incorrect password ", "#9a0707");
          console.log(res.data.error);
          this.setState({
            icon: "error"
          });
        } else {
          this.handleOpenSnackbar("Incorrect Username ", "#9a0707");
          console.log(res.data.error);
          this.setState({
            icon: "error"
          });
        }
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Snackbar
          ContentProps={{
            style: {
              backgroundColor: this.state.backgroundColor
            }
          }}
          open={this.state.snackbarState}
          message={
            <span style={{ display: "flex", alignItems: "center" }}>
              <Icon style={{ marginRight: 5 }}>{this.state.icon}</Icon>
              {this.state.snackbarMessage}
            </span>
          }
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          autoHideDuration={2000}
          onClose={this.handleCloseSnackbar}
        />
        <form className={classes.container} onSubmit={e => this.handleLogin(e)}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 700
            }}
          >
            <Grid
              container
              lg={3}
              md={12}
              direction="column"
              style={{
                border: "solid 1px #eee",
                padding: 15
              }}
            >
              <h1>Log in</h1>

              <TextField
                variant="outlined"
                fullWidth
                label="Username"
                required
                id="standard-required"
                className={classes.textField}
                type="text"
                autoComplete="email"
                margin="normal"
                name="uname"
                // error={this.state.error}
                onChange={e => {
                  this.handleChange(e);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentity style={{ color: "grey" }} />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                variant="outlined"
                fullWidth
                label="Password"
                required
                id="filled-password-input"
                className={classes.textField}
                type="password"
                margin="normal"
                name="pword"
                onChange={e => {
                  this.handleChange(e);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock style={{ color: "grey" }} />
                    </InputAdornment>
                  )
                }}
              />

              <div style={{ marginTop: 20 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Sign In
                </Button>
                &emsp;
                <Link style={{ textDecoration: "none" }} to="/register">
                  <Button
                    variant="contained"
                    color="secondary"
                    type="button"
                    fullWidth
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </Grid>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(Login);
