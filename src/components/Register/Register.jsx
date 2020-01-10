import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function Register() {
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

  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState(false);

  const onChangeHandler = data => {
    setRegisterDetails({
      ...registerDetails,
      [data.target.name]: data.target.value
    });
    console.log(registerDetails);
  };

  const checkPasswordHandler = val => {
    const x = registerDetails.password !== val ? true : false;
    setError(x);
  };

  const [showLoading,setShowLoading] = useState(false);

  const onSubmitLoading = () => {
    return (showLoading) && <LinearProgress />
  }
  
  const submitFormFn = (e) => {
    e.preventDefault();
    if(!error){
      setShowLoading(true);
      axios({
        method: 'POST',
        url: 'http://localhost:3002/register',
        data: registerDetails
      }).then( res => {
        localStorage.setItem('loginToken', res.data.token);
      }).then( response => {
        setShowLoading(false)
        console.log('Success');
      }).catch(error => {
        console.log(error);
      })
    }
  }

  return (
    <React.Fragment>
      { onSubmitLoading() }
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={e => submitFormFn(e)} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
