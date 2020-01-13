import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "../AppBar/appBar";
import axios from "axios";
import Swal from "sweetalert2";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp(props) {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [errorMsgEmail, setErrorMsgEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState();
  const [errorMsgFirstname, setErrorMsgFirstname] = useState("");
  const [errorMsgLastname, setErrorMsgLastname] = useState("");
  const [errorMsgUsername, setErrorMsgUsername] = useState("");
  const [errorMsgPassword, setErrorMsgPassword] = useState("");
  const [errorMsgMatch, setErrorMsgMatch] = useState("");

  const checkPassword = e => {
    if (e.target.value === password) {
      setMatchPassword(true);
      setErrorMsgMatch("");
    } else {
      setMatchPassword(false);
      setErrorMsgMatch("Password did not match");
    }
  };

  function validate() {
    if (
      password === "" ||
      username === "" ||
      firstname === "" ||
      lastname === "" ||
      password === "" ||
      email === "" ||
      matchPassword === ""
    ) {
      setErrorMsgPassword("This field is required!");
      setErrorMsgUsername("This field is required!");
      setErrorMsgFirstname("This field is required!");
      setErrorMsgLastname("This field is required!");
      setErrorMsgMatch("This field is required!");
      setErrorMsgEmail("This field is required!");
      Swal.fire({
        icon: "error",
        title: "Failed to Login",
        text: "Please complete the required information"
      });
    } else if (
      /^[a-zA-Z0-9-.-_]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) === false
    ) {
      setErrorMsgEmail("Invalid Email Address!");
    } else if (password !== "" && password.length < 8) {
      setErrorMsgPassword(
        "Password too short! Please enter at least 8 characters!"
      );
    } else if (
      password !== "" ||
      username !== "" ||
      firstname !== "" ||
      lastname !== "" ||
      password !== "" ||
      email !== "" ||
      (matchPassword !== "" && password.length > 8)
    ) {
      setErrorMsgFirstname("");
      setErrorMsgLastname("");
      setErrorMsgUsername("");
      setErrorMsgPassword("");
      setErrorMsgMatch("");
      axios.post("http://localhost:3004/signup/users", {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password
      });
      Swal.fire({
        title: "Signed Up Successfully",
        text: "Please Login to your account",
        icon: "success"
      });
      props.history.push("/");
    }
  }

  return (
    <div>
      <AppBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errorMsgFirstname === "" ? false : true}
                  helperText={errorMsgFirstname ? errorMsgFirstname : ""}
                  onChange={e => setFirstName(e.target.value)}
                  autoComplete="fname"
                  name="firstname"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errorMsgLastname === "" ? false : true}
                  helperText={errorMsgLastname ? errorMsgLastname : ""}
                  onChange={e => setLastName(e.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorMsgEmail === "" ? false : true}
                  helperText={errorMsgEmail ? errorMsgEmail : ""}
                  onChange={e => setEmail(e.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorMsgUsername === "" ? false : true}
                  helperText={errorMsgUsername ? errorMsgUsername : ""}
                  onChange={e => setUsername(e.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorMsgPassword === "" ? false : true}
                  helperText={errorMsgPassword ? errorMsgPassword : ""}
                  onChange={e => setPassword(e.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorMsgMatch === "" ? false : true}
                  helperText={errorMsgMatch ? errorMsgMatch : ""}
                  onChange={checkPassword}
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={validate}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item style={{ margin: "0 auto" }}>
                <Link to="signin" variant="body2">
                  Already have an account? Sign in.
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
