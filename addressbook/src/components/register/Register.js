import React from "react";
import {
  Div,
  RegisterCont,
  Title,
  Name,
  Box,
  Button,
  decoration
} from "../styles/register";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

export const Register = props => {
  const { handleOnChange } = props.data;
  return (
    <Div>
      <RegisterCont>
        <Title>Address Book</Title>
        <Title>Create your Address Book Account</Title>
        <Name>
          <TextField
            style={{ margin: "3px 3px 3px 0" }}
            onChange={e => handleOnChange(e.target)}
            name="firstName"
            variant="outlined"
            type="firstName"
            label="First Name"
            fullWidth
            required
          />
          <TextField
            style={{ margin: "3px 0 3px 3px" }}
            onChange={e => handleOnChange(e.target)}
            name="lastName"
            variant="outlined"
            type="lastName"
            label="Last Name"
            fullWidth
            required
          />
        </Name>
        <TextField
          style={{ margin: "3px 0 3px 0" }}
          onChange={e => handleOnChange(e.target)}
          name="username"
          variant="outlined"
          type="username"
          label="Username"
          fullWidth
          required
        />
        <TextField
          style={{ margin: "3px 0 3px 0" }}
          onChange={e => handleOnChange(e.target)}
          name="email"
          variant="outlined"
          type="email"
          label="Email"
          fullWidth
          required
        />
        <TextField
          style={{ margin: "3px 0 3px 0" }}
          onChange={e => handleOnChange(e.target)}
          name="password"
          variant="outlined"
          type="password"
          label="Password"
          fullWidth
          required
        />
        <TextField
          style={{ margin: "3px 0 3px 0" }}
          onChange={e => handleOnChange(e.target)}
          name="confirmPassword"
          variant="outlined"
          type="confirmPassword"
          label="Confirm Password"
          fullWidth
          required
        />
        <Box>
          <Link to="/" style={decoration}>
            <span>Sign in instead</span>
          </Link>
          <Button type="submit">Sign Up</Button>
        </Box>
      </RegisterCont>
    </Div>
  );
};
