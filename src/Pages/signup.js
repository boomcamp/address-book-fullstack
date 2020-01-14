import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
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
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Registration(props) {
  const classes = useStyles();
  const [err, showErr] = useState({
    username: {
      required: false
    },
    email: {
      required: false
    },
    fname: {
      required: false
    },
    lname: {
      required: false
    },
    password: {
      required: false
    },
    comfirmPassword: {
      required: false
    },
    checkPass: {
      required: false
    },
    required: {
      required: false
    }
  });
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    confirmpass: ""
  });

  function handleInput(e) {
    setUser({
      ...user,
      [`${e.target.name}`]: e.target.value
    });
    requiredData(e);
  }

  const requiredData = e => {
    if (e.target.value.length === 0) {
      showErr({
        ...err,
        [`${e.target.name}`]: {
          required: true
        }
      });
    } else {
      showErr({
        ...err,
        [`${e.target.name}`]: {
          required: false
        }
      });
    }
  };

  const checkPassword = e => {
    if (e.target.value.length === 0) {
      setUser({
        ...user,
        confirmpass: e.target.value,
        checkPass: "Please re-enter password"
      });
    } else if (e.target.value !== user.password) {
      setUser({
        ...user,
        confirmpass: e.target.value,
        checkPass: "Password must match"
      });
    } else {
      setUser({ ...user, confirmpass: e.target.value, checkPass: "" });
    }
  };

  function signUp(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/signup`, {
        fname: user.fname,
        lname: user.lname,
        username: user.username,
        email: user.email,
        password: user.password
      })
      .then(() => alert("Successfully Registered"))
      .then(() => {
        props.history.push("/");
      })
      .catch(error => {
        try {
          alert("Please complete the form");
        } catch {
          console.log(error);
        }
      });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={e => signUp(e)} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="fname"
                variant="outlined"
                required
                fullWidth
                value={user.fname}
                id="firstName"
                label="First Name"
                autoFocus
                onBlur={e => requiredData(e)}
                onChange={handleInput}
                error={err.fname.required}
                helperText={!err.fname.required ? "" : "Required to fill out"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={user.lname}
                id="lastName"
                label="Last Name"
                name="lname"
                autoComplete="lname"
                onBlur={e => requiredData(e)}
                onChange={handleInput}
                error={err.lname.required}
                helperText={!err.lname.required ? "" : "Required to fill out"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="email"
                id="email"
                value={user.email}
                label="Email Address"
                name="email"
                autoComplete="email"
                onBlur={e => requiredData(e)}
                onChange={handleInput}
                error={err.email.required}
                helperText={!err.email.required ? "" : "Required to fill out"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={user.username}
                autoComplete="userName"
                onBlur={e => requiredData(e)}
                onChange={handleInput}
                error={err.username.required}
                helperText={
                  !err.username.required ? "" : "Required to fill out"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={user.password}
                autoComplete="current-password"
                onBlur={e => requiredData(e)}
                onChange={handleInput}
                error={err.password.required}
                helperText={
                  !err.password.required ? "" : "Required to fill out"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmpass"
                label="Confirm Password"
                type="password"
                id="confirmpass"
                value={user.confirmpass}
                onBlur={checkPassword}
                error={user.checkPass ? true : false}
                helperText={user.checkPass ? user.checkPass : " "}
                onChange={checkPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-start">
            <Grid item>
              <Link to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
