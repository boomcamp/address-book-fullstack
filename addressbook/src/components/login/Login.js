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
import { getUserData } from "../customHooks/getUserData";
import { useForm } from "react-hook-form";

export const Login = props => {
  const {
    handleOnChange,
    setUser,
    loginData,
    setRedirect,
    sort,
    setUserData
  } = props.data;
  const [error, setError] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const handleLogin = () => {
    Axios.post(`${url}/login`, loginData)
      .then(res => {
        setUser(res.data);
        getUserData(res.data, sort).then(user => setUserData(user));
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
        <form onSubmit={handleSubmit(handleLogin)}>
          <ContTitle style={blue}>Address Book</ContTitle>
          <ContTitle>Sign In</ContTitle>
          <Text>Sign in using your Email</Text>
          <TextField
            error={!!errors.username || error}
            onChange={e => handleOnChange("login", e.target)}
            style={marginBot}
            name="username"
            variant="outlined"
            type="username"
            label="Username"
            fullWidth
            inputRef={register({
              required: "Username is required"
            })}
            helperText={errors.username ? `${errors.username.message}` : ""}
          />
          <TextField
            error={!!errors.password || error}
            onChange={e => handleOnChange("login", e.target)}
            style={marginBot}
            variant="outlined"
            name="password"
            type="password"
            label="Password"
            fullWidth
            inputRef={register({
              required: "Password is required"
            })}
            helperText={
              errors.password
                ? errors.password.message
                : error
                ? "Invalid username or password!"
                : ""
            }
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
