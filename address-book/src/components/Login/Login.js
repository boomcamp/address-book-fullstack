import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom'

export default function Login() {
  const classes = useStyles();

  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const loginUserName = e => {
    console.log(e.target.value);

    setState(prevState => {
      return { ...prevState, username: e.target.value };
    });
  };

  const EventChecker = e => {
    setState(prevState => {
      return { ...prevState, password: e.target.value };
    });
  };

  return (
    <Fragment>
      <div className="login-container" style={styles.loginContainer}>
        <h3>Login</h3>
        <div className="input-fields">
          <ValidatorForm
            className={classes.root}
            autoComplete="off"
            onError={errors => console.log(errors)}
            style={styles.inputfields}
          >
            <TextValidator
              id="outlined-required"
              name="username"
              value={state.username}
              validators={["required"]}
              errorMessages={["this field is required"]}
              label="User Name"
              variant="outlined"
              onChange={loginUserName}
            />
            <TextValidator
              id="outlined-password-input"
              name="password"
              value={state.password}
              validators={["required"]}
              errorMessages={["this field is required"]}
              label="Password"
              variant="outlined"
              onChange={EventChecker}
              type="password"
            />
            <Button type="submit">Submit</Button>
          </ValidatorForm>
        </div>

        <Link style={styles.siguplink} to='/signup'>signup</Link>
      </div>
    </Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

const styles = {
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "400px",
    border: "1px solid grey",
    height: "400px",
    margin: "0 auto",
    marginTop: "20%"
  },
  inputfields: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  siguplink: {
    cursor: "pointer",
    color: "grey",
    textDecoration: "underline"
  }
};
