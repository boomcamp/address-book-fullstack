import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn(props) {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsgUsername, setErrorMsgUsername] = useState("");
  const [errorMsgPassword, setErrorMsgPassword] = useState("");

  function validate(username, password, props) {
    if (password === "" || username === "") {
      setErrorMsgPassword("This field is required!");
      setErrorMsgUsername("This field is required!");
      Swal.fire({
        icon: "error",
        title: "Failed to Login",
        text: "Please complete the required information"
      });
    } else {
      setErrorMsgUsername("");
      setErrorMsgPassword("");
      axios
        .post("http://localhost:3004/signin", {
          username: username,
          password: password
        })
        .then(res => {
          console.log(res);
          sessionStorage.setItem("isLoggedIn", true);
          localStorage.setItem("Token", res.data.token);
          localStorage.setItem("username", username);
          localStorage.setItem("userid", res.data.id);
          Swal.fire({
            icon: "success",
            title: "Logged In Successfully!",
            text: `Welcome ${username}!`
          }).then(() => {
            window.location = "/addressbook";
          });
        })
        .catch(e => {
          setErrorMsgPassword("Email and Password did not match");
          setErrorMsgUsername("Email and Password did not match");
          Swal.fire({
            icon: "error",
            title: "Failed to Login",
            text: "Please check your email and password"
          });
        });
    }
  }

  return (
    <div>
      <AppBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              error={errorMsgUsername === "" ? false : true}
              helperText={errorMsgUsername ? errorMsgUsername : ""}
              onChange={e => setUsername(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              error={errorMsgPassword === "" ? false : true}
              helperText={errorMsgPassword ? errorMsgPassword : ""}
              onChange={e => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => validate(username, password)}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item style={{ margin: "0 auto" }}>
                <Link to="signup" variant="body2">
                  Don't have an account? Sign Up.
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
