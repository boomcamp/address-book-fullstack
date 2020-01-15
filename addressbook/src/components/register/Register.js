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
import Axios from "axios";
import { url } from "../../url";
import { toast } from "react-toastify";

export const Register = props => {
  const {
    handleOnChange,
    validation,
    registrationData,
    setRedirect
  } = props.data;

  const handleRegister = e => {
    e.preventDefault();
    const data = registrationData;
    delete data.confirmPassword;
    Axios.post(`${url}/register`, data)
      .then(res => {
        toast.info("registration sucessful!", {
          position: toast.POSITION.TOP_CENTER
        });
        setRedirect(true);
      })
      .catch(err => {
        toast.info(err.response.data.error, {
          position: toast.POSITION.TOP_CENTER
        });
      });
  };

  return (
    <Div>
      <RegisterCont>
        <form onSubmit={e => handleRegister(e)}>
          <Title style={{ margin: "20px 0 0 0" }}>Address Book</Title>
          <Title>Create your Address Book Account</Title>
          <Name>
            <TextField
              style={{ margin: "3px 6px 3px 0" }}
              onChange={e => handleOnChange("register", e.target)}
              name="firstName"
              variant="outlined"
              type="firstName"
              label="First Name"
              fullWidth
              required
            />
            <TextField
              style={{ margin: "3px 0 3px 0" }}
              onChange={e => handleOnChange("register", e.target)}
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
            onChange={e => handleOnChange("register", e.target)}
            name="username"
            variant="outlined"
            type="username"
            label="Username"
            fullWidth
            required
          />
          <TextField
            style={{ margin: "3px 0 3px 0" }}
            onChange={e => handleOnChange("register", e.target)}
            name="email"
            variant="outlined"
            type="email"
            label="Email"
            fullWidth
            required
          />
          <TextField
            style={{ margin: "3px 0 3px 0" }}
            onChange={e => handleOnChange("register", e.target)}
            name="password"
            variant="outlined"
            type="password"
            label="Password"
            fullWidth
            required
          />
          <TextField
            error={validation.confirmPassword}
            style={{ margin: "3px 0 3px 0" }}
            onChange={e => handleOnChange("register", e.target)}
            name="confirmPassword"
            variant="outlined"
            type="password"
            label="Confirm Password"
            fullWidth
            required
            helperText={validation.confirmPasswordMsg}
          />
          <Box>
            <Link to="/" style={decoration} onClick={() => setRedirect(true)}>
              <span>Sign in instead</span>
            </Link>
            <Button type="submit">Sign Up</Button>
          </Box>
        </form>
      </RegisterCont>
    </Div>
  );
};
