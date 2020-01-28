import React, { useState } from "react";
import { Link, useHistory, } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";

import Header from "../Header/Header";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register(props) {
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
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));

  const classes = useStyles();

  const history = useHistory();

  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: ""
  });

  const [error, setError] = useState(false);

  const onChangeHandler = data => {
    setRegisterDetails({
      ...registerDetails,
      [data.target.name]: data.target.value
    });
  };

  const checkPasswordHandler = val => {
    const x = registerDetails.password !== val ? true : false;
    setError(x);
  };

  const [showLoading, setShowLoading] = useState(false);

  const onSubmitLoading = () => {
    return showLoading && <LinearProgress />;
  };

  const submitFormFn = e => {
    e.preventDefault();
    if (!error) {
      setShowLoading(true);
      axios({
        method: "POST",
        url: "http://localhost:3002/api/signup",
        data: registerDetails
      })
        .then(response => {
          setShowLoading(false);
        })
        .then(res2 => {
          history.push('/');
        })
        .catch(error => {
          toast.error("Something went wrong. Please try again.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
        });
    }else{
      setShowLoading(false);
      toast.warning("Password do not match!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };

  return (
    <React.Fragment>
      <Header />
      {onSubmitLoading()}
      <Container component="main" maxWidth="md">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={e => submitFormFn(e)} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  type="text"
                  id="username"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  error={error}
                  variant="outlined"
                  required
                  fullWidth
                  min={4}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="ConfirmPassword"
                  onChange={event => checkPasswordHandler(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="firstname"
                  label="Firstname"
                  type="text"
                  id="firstname"
                  onChange={onChangeHandler}
                  placeholder="ex. John"
                />
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="lastname"
                  label="Lastname"
                  type="text"
                  id="lastname  "
                  onChange={onChangeHandler}
                  placeholder="ex. Doe"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}
