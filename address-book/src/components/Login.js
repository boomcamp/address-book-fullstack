import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Typography,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockOutlined from "@material-ui/icons/Lock";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: ""
  });
  const [username, setUsername] = useState("");
  const [ErrorUsername, setErrorUsername] = useState("");
  const [ErrorPass, setErrorPass] = useState("");
  const handleChangePassword = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleSubmit = e => {
    e.preventDefault();
    values.password === ""
      ? setErrorPass("This field is required")
      : setErrorPass("");
    if (username === "") setErrorUsername("This field is required");
    else setErrorUsername("");
    if (username && values.password.length >= 8) {
      // Login
      axios
        .post("http://localhost:3004/signin", {
          username: username,
          password: values.password
        })
        .then(response => {
          localStorage.setItem("Token", response.data.token);
          localStorage.setItem("username", username);
          localStorage.setItem("userid", response.data.id);
          Swal.fire({
            icon: "success",
            title: "Logged In Successfully!"
          }).then(() => {
            window.location = "/addressbook";
          });
        })
        .catch(response => {
          // console.log(response);
          setErrorPass("Email and Password did not match");
          Swal.fire({
            title: response.data,
            icon: "error",
            button: true
          });
          // Swal.fire({
          //   icon: "error",
          //   title: "Failed to Login",
          //   text: "Please check your email and password"
          // });
        });
      // Login End
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
              error={ErrorUsername === "" ? false : true}
              helperText={ErrorUsername ? ErrorUsername : ""}
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
              onChange={e => setUsername(e.target.value)}
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
              onChange={handleChangePassword("password")}
              InputLabelProps={{ required: false }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
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
