import React, {  useState, Fragment } from "react";
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
        <h3>Login</h3>
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
              error={(errstate.status === 400 ? true : false)}
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
            <Button type="submit">Submit</Button>
          </ValidatorForm>
        </div>

        <Link style={styles.siguplink} to="/signup">
          signup
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
