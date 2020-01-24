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
import { useForm } from "react-hook-form";

export const Register = props => {
  const { handleOnChange, registrationData, setRedirect } = props.data;
  const { register, handleSubmit, errors, setError, clearError } = useForm();
  React.useEffect(() => {
    setError("disableBtn", "notMatch", "disabled");
  }, []);

  const handleRegister = () => {
    const data = registrationData;
    delete data.confirmPassword;
    Axios.post(`${url}/register`, data)
      .then(() => {
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
        <form onSubmit={handleSubmit(handleRegister)}>
          <Title style={{ margin: "20px 0 0 0" }}>Address Book</Title>
          <Title>Create your Address Book Account</Title>
          <Name>
            <TextField
              error={!!errors.first_name}
              style={{ margin: "3px 6px 3px 0" }}
              onChange={e => handleOnChange("register", e.target)}
              name="first_name"
              variant="outlined"
              type="first_name"
              label="First Name"
              fullWidth
              inputRef={register({
                required: "First name is required"
              })}
              helperText={errors.first_name ? errors.first_name.message : ""}
            />
            <TextField
              error={!!errors.last_name}
              style={{ margin: "3px 0 3px 0" }}
              onChange={e => handleOnChange("register", e.target)}
              name="last_name"
              variant="outlined"
              type="last_name"
              label="Last Name"
              fullWidth
              inputRef={register({
                required: "Last name is required"
              })}
              helperText={errors.last_name ? errors.last_name.message : ""}
            />
          </Name>
          <TextField
            error={!!errors.username}
            style={{ margin: "3px 0 3px 0" }}
            onChange={e => {
              handleOnChange("register", e.target);
              if (!usernameRegex.test(e.target.value)) {
                setError("disableBtn", "notMatch", "disabled");
                return setError(
                  "username",
                  "notMatch",
                  "Must have at least 6 Alpha-Numeric characters!"
                );
              }
              clearError("disableBtn");
              clearError("username");
            }}
            name="username"
            variant="outlined"
            type="username"
            label="Username"
            fullWidth
            inputRef={register({
              required: "Username is required"
            })}
            helperText={errors.username ? errors.username.message : ""}
          />
          <TextField
            error={!!errors.email}
            style={{ margin: "3px 0 3px 0" }}
            onChange={e => {
              handleOnChange("register", e.target);
              if (!emailRegex.test(e.target.value)) {
                setError("disableBtn", "notMatch", "disabled");
                return setError("email", "notMatch", "Email must be valid!");
              }
              clearError("disableBtn");
              clearError("email");
            }}
            name="email"
            variant="outlined"
            label="Email"
            fullWidth
            inputRef={register({
              required: "Email Address is required"
            })}
            helperText={errors.email ? errors.email.message : ""}
          />
          <TextField
            error={!!errors.password}
            style={{ margin: "3px 0 3px 0" }}
            onChange={e => {
              handleOnChange("register", e.target);
              if (e.target.value.length < 6) {
                setError("disableBtn", "notMatch", "disabled");
                return setError(
                  "password",
                  "notMatch",
                  "Must have at least 6 character"
                );
              }

              if (!(registrationData.confirmPassword === e.target.value)) {
                setError("disableBtn", "notMatch", "disabled");
                return setError(
                  "password",
                  "notMatch",
                  "Password don't match!"
                );
              }
              clearError("confirmPassword");
              clearError("disableBtn");
              clearError("password");
            }}
            name="password"
            variant="outlined"
            type="password"
            label="Password"
            fullWidth
            inputRef={register({
              required: "Password is required"
            })}
            helperText={errors.password ? errors.password.message : ""}
          />
          <TextField
            error={!!errors.confirmPassword}
            style={{ margin: "3px 0 3px 0" }}
            onChange={e => {
              handleOnChange("register", e.target);
              if (!(registrationData.password === e.target.value)) {
                setError("disableBtn", "notMatch", "disabled");
                return setError(
                  "confirmPassword",
                  "notMatch",
                  "Password don't match!"
                );
              }
              clearError("disableBtn");
              clearError("confirmPassword");
              clearError("password");
            }}
            name="confirmPassword"
            variant="outlined"
            type="password"
            label="Confirm Password"
            fullWidth
            inputRef={register({
              required: "Confirm password is required"
            })}
            helperText={
              errors.confirmPassword ? errors.confirmPassword.message : ""
            }
          />
          <Box>
            <Link to="/" style={decoration} onClick={() => setRedirect(true)}>
              <span>Sign in instead</span>
            </Link>
            <Button type="submit" disabled={!!errors.disableBtn}>
              Sign Up
            </Button>
          </Box>
        </form>
      </RegisterCont>
    </Div>
  );
};

const emailRegex = /^(([^<>(),;:\s@]+([^<>(),;:\s@]+)*)|(.+))@(([^<>()[,;:\s@]+)+[^<>()[.,;:\s@]{2,})$/i;
const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
