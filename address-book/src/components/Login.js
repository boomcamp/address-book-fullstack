import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Typography,
  Container,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockOutlined from "@material-ui/icons/Lock";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default function Login({ capitalize }) {
  const classes = useStyles();
  let history = useHistory();
  const [values, setValues] = useState({
    password: "",
    username: "",
    errorUsername: ""
  });
  const [ErrorPass, setErrorPass] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    values.password === ""
      ? setErrorPass("This field is required")
      : setErrorPass("");
    if (values.username === "")
      setValues({ ...values, errorUsername: "This field is required" });
    else setValues({ ...values, errorUsername: "" });
    if (values.username && values.password.length >= 8) {
      axios
        .post("http://localhost:3004/signin", {
          username: values.username,
          password: values.password
        })
        .then(response => {
          localStorage.setItem("Token", response.data.token);
          Swal.fire({
            icon: "success",
            title: "Logged In Successfully!",
            text: `Welcome ${capitalize(String(response.data.firstname))}`
          }).then(() => history.push("/addressbook"));
        })
        .catch(response => {
          setErrorPass("Email and Password did not match");
          Swal.fire({
            title: "Failed to Login",
            icon: "error",
            button: true,
            text: response.data
          });
        });
    } else if (values.password.length < 8 && values.password.length > 0) {
      setErrorPass("Email and Password did not match");
      Swal.fire({
        title: "Login Failed! Please check your email or password!",
        icon: "error",
        button: true
      });
    }
  };
  return (
    <Container
      maxWidth="xs"
      component="div"
      className={`${classes.paper} ${classes.rooot}`}
    >
      <PersonPinIcon className={classes.avatar} />
      <Typography component="h1" variant="h5" className="header-top">
        Login
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={1} alignItems="flex-end" xs={12}>
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <TextField
              error={values.errorUsername === "" ? false : true}
              helperText={values.errorUsername ? values.errorUsername : ""}
              variant="standard"
              margin="normal"
              required={true}
              id="input-with-icon-grid standard-full-width standard-size-normal"
              label="Username"
              name="username"
              autoComplete="username"
              style={{ margin: 8 }}
              fullWidth
              type="username"
              onChange={e => setValues({ ...values, username: e.target.value })}
              InputLabelProps={{ required: false }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end" xs={12}>
          <Grid item xs={1}>
            <LockOutlined />
          </Grid>
          <Grid item xs={11}>
            <TextField
              error={ErrorPass === "" ? false : true}
              helperText={ErrorPass ? ErrorPass : ""}
              variant="standard"
              margin="normal"
              required
              id="input-with-icon-grid standard-adornment-password standard-size-normal"
              label="Password"
              name="password"
              autoComplete="password"
              style={{ margin: 8 }}
              fullWidth
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={e => setValues({ ...values, password: e.target.value })}
              InputLabelProps={{ required: false }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setValues({
                          ...values,
                          showPassword: !values.showPassword
                        })
                      }
                      onMouseDown={e => e.preventDefault()}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={e => handleSubmit(e)}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  rooot: {
    background: "#FFF",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    left: "50%",
    top: "40%",
    position: "absolute",
    msTransform: "translate(-50%, -50%)",
    webkitTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
    zIndex: "2"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto"
  },
  avatar: {
    fontSize: "50px",
    marginTop: 10
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#009688"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  noPad: {
    padding: "0"
  },
  white: {
    color: "white"
  },
  margins: {
    margin: theme.spacing(1)
  }
}));
