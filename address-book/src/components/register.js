import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import Icon from "@material-ui/core/Icon";
import EmailIcon from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
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
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      uname: "",
      pword: "",
      cpword: "",
      snackbarState: false,
      snackbarMessage: "",
      icon: "",
      fname: "",
      lname: ""
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

  componentDidMount() {
    if (localStorage.getItem("token") === null) {
    } else {
      this.props.history.push("/addressbook");
    }
  }
  handleSubmit = event => {
    event.preventDefault();

    if (this.state.pword === this.state.cpword) {
      axios
        .post("/users", {
          firstname: this.state.fname,
          lastname: this.state.lname,
          email: this.state.email,
          username: this.state.uname,
          password: this.state.pword
        })
        .then(res => {
          if(res.data.message){
            this.handleOpenSnackbar("UserName is Already Taken", "#9a0707");
            this.setState({
              icon: "error"
            });
          }
          else{
            localStorage.setItem("create", this.state.name)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);
            this.props.history.push("/addressbook");
            this.setState({
              firstname: "",
              lastname: "",
              email: "",
              uname: "",
              pword: "",
              cpword: ""
            });
          }
        });
    } else {
      this.handleOpenSnackbar("Invalid password confirmation", "#9a0707");
      this.setState({
        icon: "error"
      });
    }
  };

  setFields = event => {
    var fieldname = event.target.name;
    var fieldError = fieldname + "Error";
    var value = event.target.value;
    this.setState({
      [fieldname]: value,
      [fieldError]: value ? false : true
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

        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                New User
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <form
          className={classes.container}
          onSubmit={e => {
            this.handleSubmit(e);
          }}
          autoComplete="off"
        >
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
              style={{
           
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Grid
                item
                lg={3}
                md={12}
 
                style={{
                  border: "solid 1px #eee",
                  padding: 15
                }}
              >
                <h1>Registration</h1>
                <TextField
                fullWidth
             
                  label={
                    this.state.fnameError ? "Required FirstName" : "FirstName"
                  }
                  error={this.state.fnameError}
                  className={classes.textField}
                  margin="normal"
                  type="text"
                  name="fname"
                  value={this.state.fname}
                  onChange={e => {
                    this.setFields(e);
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonAddIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                fullWidth
               
                  label={
                    this.state.lnameError ? "Required LastName" : "LastName"
                  }
                  error={this.state.lnameError}
                  className={classes.textField}
                  margin="normal"
                  type="text"
                  name="lname"
                  value={this.state.lname}
                  onChange={e => {
                    this.setFields(e);
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonAddIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                fullWidth
         
                  label={this.state.emailError ? "Required Email" : "Email"}
                  error={this.state.emailError}
                  className={classes.textField}
                  margin="normal"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={e => {
                    this.setFields(e);
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  label={
                    this.state.unameError ? "Required Username" : "Username"
                  }
                  error={this.state.unameError}
                  className={classes.textField}
                  margin="normal"
                  type="text"
                  name="uname"
                  value={this.state.uname}
                  onChange={e => {
                    this.setFields(e);
                  }}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                fullWidth
                  label={
                    this.state.pwordError ? "Required Password" : "Password"
                  }
                  error={this.state.pwordError}
                  className={classes.textField}
                  margin="normal"
                  type="password"
                  value={this.state.pword}
                  name="pword"
                  onChange={e => {
                    this.setFields(e);
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                fullWidth
                  label={
                    this.state.cpwordError
                      ? "Required Confirm Password"
                      : "Confirm Password"
                  }
                  error={this.state.cpwordError}
                  className={classes.textField}
                  margin="normal"
                  type="password"
                  name="cpword"
                  value={this.state.cpword}
                  onChange={e => {
                    this.setFields(e);
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    )
                  }}
                />

                <Button fullWidth variant="contained" color="primary" type="submit">
                  Register
                </Button>
                <Link style={{ textDecoration: "none", textAlign: 'center' }} to={`/`}>
                  <p>Already have an account</p>
                </Link>
              </Grid>
            </Grid>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(Register);
