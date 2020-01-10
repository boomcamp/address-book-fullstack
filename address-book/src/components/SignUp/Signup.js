import React, { useState, Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default function Signup() {
  const classes = useStyles();

  const [state, setState] = useState({
    //   email: "",
    username: "",
    //   firstname: "",
    //   lastname: "",
    password: "",
    repassword: ""
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== state.password) {
        return false;
      }

      return true;
    });

    ValidatorForm.addValidationRule("lengthText", value => {
      if (value.length < 6 && state.length !== 0) {
        return false;
      }

      return true;
    });
  });

  const inUserName = e => {
    setState(prevState => {
      return { ...prevState, username: e.target.value };
    });
  };

  const inPassword = e => {
    setState(prevState => {
      return { ...prevState, password: e.target.value };
    });
  };

  const PassVerify = e => {
    setState(prevState => {
      return { ...prevState, repassword: e.target.value };
    });
  };

  const SignUp = e => {
    if (state.username && state.password) {
      axios
        .post("http://localhost:5000/api/signup", {
          username: state.username,
          password: state.password
        })
        .then(data => {
          sessionStorage.setItem("token", `Bearer ${data.data.token}`);
          window.location.reload();
          return data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  if (sessionStorage.getItem("token")) {
    alert("Redirecting to Login Page");
    sessionStorage.removeItem("token");
    return <Redirect to="/" />;
  } else {
    console.log("checking for token");
  }

  return (
    <Fragment>
      <div className="login-container" style={styles.loginContainer}>
        <h3>Sign Up</h3>
        <div className="input-fields">
          <ValidatorForm
            className={classes.root}
            // autoComplete="off"
            onError={errors => console.log(errors)}
            style={styles.inputfields}
            onSubmit={SignUp}
            onError={errors => console.log(errors)}
          >
            <TextValidator
              id="outlined-required"
              name="username"
              value={state.username}
              validators={["required"]}
              errorMessages={["this field is required"]}
              label="User Name"
              variant="outlined"
              onChange={inUserName}
            />

            <TextValidator
              id="outlined-password-input"
              name="password"
              value={state.password}
              validators={["required", "lengthText"]}
              errorMessages={["this field is required", "password too short"]}
              label="Password"
              variant="outlined"
              onChange={inPassword}
              type="password"
            />

            <TextValidator
              id="outlined-password-input"
              name="repassword"
              value={state.repassword}
              validators={["required", "isPasswordMatch"]}
              errorMessages={["this field is required", "Password don't match"]}
              label="Verify Password"
              variant="outlined"
              onChange={PassVerify}
              type="password"
            />

            <Button type="submit">Register</Button>
          </ValidatorForm>
        </div>
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
