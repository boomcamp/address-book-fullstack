import React, { useState } from "react";
import {
  Div,
  LoginCont,
  marginBot,
  ContTitle,
  Button,
  Text,
  Box,
  blue,
  decoration
} from "../styles/login";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import Axios from "axios";
import { port } from "../../port";
import { toast } from "react-toastify";

export const Login = props => {
  const {
    handleOnChange,
    setUser,
    loginData,
    setRedirect,
    validation
  } = props.data;
  const [error, setError] = useState(false);

  const handleLogin = e => {
    e.preventDefault();
    Axios.post(`http://localhost:${port}/api/login`, loginData)
      .then(res => {
        setUser(res.data);
        toast.info("Login sucessful!", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(err => {
        setError(true);
      });
  };
  return (
    <Div>
      <LoginCont>
        <form onSubmit={e => handleLogin(e)}>
          <ContTitle style={blue}>Address Book</ContTitle>
          <ContTitle>Sign In</ContTitle>
          <Text>Sign in using your Email</Text>
          <TextField
            error={error}
            onChange={e => handleOnChange("login", e.target)}
            style={marginBot}
            name="email"
            variant="outlined"
            type="email"
            label="Email"
            fullWidth
            required
            helperText={error ? "Invalid username!" : ""}
          />
          <TextField
            error={error}
            onChange={e => handleOnChange("login", e.target)}
            style={marginBot}
            variant="outlined"
            name="password"
            type="password"
            label="Password"
            fullWidth
            required
            helperText={error ? "Incorrect password!" : ""}
          />
          <Box>
            <Link
              to="/register"
              style={decoration}
              onClick={() => setRedirect(false)}
            >
              <span>Create Account</span>
            </Link>
            <Button type="submit">Sign In</Button>
          </Box>
        </form>
      </LoginCont>
    </Div>
  );
};
