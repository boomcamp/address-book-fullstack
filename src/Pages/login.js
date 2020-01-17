import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import * as ls from "local-storage";

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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Login(props) {
  const classes = useStyles();
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  function handleInput(e) {
    setUser({
      ...user,
      [`${e.target.name}`]: e.target.value
    });
  }

  function login(user) {
    axios
      .post("http://localhost:3001/login", {
        username: user.username,
        password: user.password
      })
      .then(res => {
        ls.set("auth", res.data.token);
        ls.set("user", {
          id: res.data.id,
          firstname: res.data.fname,
          lastname: res.data.lname
        });
        props.history.push(`/contacts/${res.data.id}`);
      })
      .catch(error => {
        try {
          alert(error.response.data);
        } catch {
          console.log(error);
        }
      });
  }
  return ls.get("auth") ? (
    <Redirect to={`/contacts/${ls.get("user").id}`} />
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => e.preventDefault()}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleInput}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
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
            onChange={handleInput}
            autoComplete="current-password"
          />

          <Button
            onClick={() => login(user)}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
