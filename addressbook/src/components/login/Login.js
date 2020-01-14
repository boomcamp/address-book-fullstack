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
import { url } from "../../url";
import { toast } from "react-toastify";

export const Login = props => {
  const { handleOnChange, setUser, loginData, setRedirect } = props.data;
  const [error, setError] = useState(false);

  const handleLogin = e => {
    e.preventDefault();
    Axios.post(`${url}/login`, loginData)
      .then(res => {
        setUser(res.data);
        toast.info("Login sucessful!", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(() => {
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
            name="username"
            variant="outlined"
            type="username"
            label="Username"
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
