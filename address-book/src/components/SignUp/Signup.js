import React, { useState, Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup() {
  const classes = useStyles();

  const [state, setState] = useState({
    username: "",
    password: "",
    repassword: ""
  });

  const [errstate, seterrState] = useState({});

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
    e.persist();

    setState(prevState => {
      return { ...prevState, username: e.target.value };
    });
  };

  const inPassword = e => {
    e.persist();

    setState(prevState => {
      return { ...prevState, password: e.target.value };
    });
  };

  const PassVerify = e => {
    e.persist();

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
          seterrState(err.response);

          console.log(err.response);
        });
    }
  };

  if (sessionStorage.getItem("token")) {
    alert("Redirecting to Login Page");
    sessionStorage.removeItem("token");
    return <Redirect to="/" />;
  } else {
    // console.log("checking for token");
  }

  return (
    <Fragment>
      <div className={classes.loginContainer}>
        <p>Sign Up</p>
        <div className="input-fields">
          <ValidatorForm
            className={classes.root}
            onError={errors => console.log(errors)}
            style={styles.inputfields}
            onSubmit={SignUp}
            onError={errors => console.log(errors)}
          >
            <TextValidator
              error={errstate.status === 400 ? true : false}
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
            {errstate.status === 400 ? (
              <p style={{ color: "red", fontSize: "0.8em" }}>
                {errstate.data.error}
              </p>
            ) : (
              ""
            )}

            <button style={styles.submitBtn} type="submit">
              Register
            </button>

            <Link
              style={{
                color: "grey",
                textDecoration: "none",
                fontSize: "0.8em",
                textAlign: "center"
                // marginBottom: '40px'
              }}
              to="/"
            >
              <span>Back to Login</span>
            </Link>
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
  },
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "400px",
    border: "1px solid #e8e8e8",
    height: "400px",
    margin: "0 auto",
    marginTop: "190px",
    boxShadow: "rgb(214, 214, 214) 1px 1px 5px 0px",
    borderRadius: "9px",
    padding: "15px 0",
    background: "white",
    [theme.breakpoints.down(600)]: {
      width: "400px",
      marginBottom: "10px",
      marginTop: "50px",
    },
    [theme.breakpoints.down(420)]: {
      width: "320px",
      marginTop: "70px",
      marginBottom: "10px"
    }
  }
}));

const styles = {
  inputfields: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  siguplink: {
    cursor: "pointer",
    color: "#2196f3",
    textDecoration: "underline",
    margin: "0 auto"
  },
  submitBtn: {
    width: "186px",
    height: "32px",
    background: "#2196F3",
    color: "white",
    border: "none",
    marginTop: "25px",
    marginBottom: "20px",
    borderRadius: "4px",
    cursor: "pointer"
  }
};
