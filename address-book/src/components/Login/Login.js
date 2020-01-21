import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default function Login() {
  const classes = useStyles();

  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const [errstate, seterrState] = useState({});

  const loginUserName = e => {
    e.persist();
    setState(prevState => {
      return { ...prevState, username: e.target.value };
    });
  };

  const EventChecker = e => {
    e.persist();
    setState(prevState => {
      return { ...prevState, password: e.target.value };
    });
  };

  const Login = e => {
    if (state.username && state.password) {
      axios({
        method: "post",
        url: "http://localhost:5000/api/login",
        data: {
          username: state.username,
          password: state.password
        }
      })
        .then(data => {
          console.log(data);
          sessionStorage.setItem("token", `Bearer ${data.data.token}`);
          sessionStorage.setItem("userid", data.data.id);

          window.location.reload();
          return data;
        })
        .catch(err => {
          console.log(err.response);
          seterrState(err.response);
        });
    }
  };

  if (sessionStorage.getItem("token")) {
    return <Redirect to="/addressbook" />;
  } else {
    console.log("checking for token");
  }

  return (
    <Fragment>
      <div className="login-container" style={styles.loginContainer}>
        <p>Login</p>
        <div className="input-fields">
          <ValidatorForm
            className={classes.root}
            autoComplete="off"
            onError={errors => console.log(errors)}
            style={styles.inputfields}
            onSubmit={Login}
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
              onChange={loginUserName}
            />
            <TextValidator
              error={errstate.status === 400 ? true : false}
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
            {errstate.status === 400 ? (
              <p style={{ color: "red", fontSize: "0.8em" }}>
                {errstate.data.error}
              </p>
            ) : (
              ""
            )}

            <button style={styles.submitBtn} type="submit">
              Submit
            </button>
            
          </ValidatorForm>
        </div>

        <Link
          style={{ color: "grey", textDecoration: "none", fontSize: "0.8em" }}
          to="/signup"
        >
          Need an account?{" "}
          <span style={styles.signuplink}>click to sign-up</span>
        </Link>
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
    border: "1px solid #e8e8e8",
    height: "400px",
    margin: "0 auto",
    marginTop: "190px",
    boxShadow: "rgb(214, 214, 214) 1px 1px 5px 0px",
    borderRadius: "9px",
    background:'white'
  },
  inputfields: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  signuplink: {
    cursor: "pointer",
    color: "#2196f3",
    textDecoration: "underline"
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
