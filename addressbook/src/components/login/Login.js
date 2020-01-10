import React from "react";
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
} from "../style/style";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

export const Login = props => {
  const { handleLogin, handleOnChange } = props.data;
  return (
    <Div>
      <LoginCont>
        <form onSubmit={handleLogin}>
          <ContTitle style={blue}>Address Book</ContTitle>
          <ContTitle>Sign In</ContTitle>
          <Text>Sign in using your Email</Text>
          <TextField
            onChange={e => handleOnChange(e.target)}
            style={marginBot}
            name="email"
            variant="outlined"
            type="email"
            label="Email"
            fullWidth
            required
          />
          <TextField
            onChange={e => handleOnChange(e.target)}
            style={marginBot}
            variant="outlined"
            name="password"
            type="password"
            label="Password"
            fullWidth
            required
          />
          <Box>
            <Link to="/register" style={decoration}>
              <span>Create Account</span>
            </Link>
            <Button type="submit">Sign In</Button>
          </Box>
        </form>
      </LoginCont>
    </Div>
  );
};
