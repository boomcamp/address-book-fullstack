import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory, } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LinearProgress from "@material-ui/core/LinearProgress";

function Login() {
  const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    caption: {
      alignSelf: "center",
      fontWeight: "bold",
      flexDirection: "column",
      display: "flex"
    },
    textField: {
      color: "#ffffff"
    },
    loginIcon: {
      color: "#f19208",
      fontSize: "6vh",
      margin: "auto"
    }
  }));

  const history = useHistory();
  const classes = useStyles();

  const [showLoading, setShowLoading] = useState(false);

  const onSubmitLoading = () => {
    return showLoading && <LinearProgress />;
  };

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: ""
  });

  const onHandleChange = e => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value
    });
  };

  const submitFormFn = e => { 
    e.preventDefault();
    setShowLoading(true);
    axios({
      method: "POST",
      url: "http://localhost:3002/api/login",
      data: loginDetails
    })
      .then(response => {
        localStorage.setItem("sessionid", response.data.userID);
        localStorage.setItem("token", response.data.token);
      })
      .then(response => {
        setShowLoading(false);
      })
      .then(response => {
        history.push('/dashboard');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      {onSubmitLoading()}
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Typography className={classes.caption} component="h1" variant="h5">
            <AccountCircleIcon className={classes.loginIcon} />
            Sign in
          </Typography>
          <form onSubmit={e => submitFormFn(e)} className={classes.form}>
            <TextField
              className="clases.textField"
              variant="outlined"
              margin="normal"
              required
              type="text"
              fullWidth
              label="Username"
              name="username"
              autoFocus
              onChange={onHandleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onHandleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify="center">
              <Grid item xs={6}>
                <Link to="/register" variant="body2">
                  Don't have an account? Sign Up Now!
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Login;
