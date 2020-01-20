import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Close from "@material-ui/icons/HighlightOff";
import axios from "axios";
import styled from "styled-components";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const CloseButton = styled(Close)`
  float: right;
  cursor: pointer;
`;

export default function AddContactModal({
  open,
  setOpen,
  headers,
  match,
  setRows,
  rows,
  setAll,
  all
}) {
  const classes = useStyles();
  const [contact, setContact] = useState({
    first_name: "",
    last_name: "",
    mobile_phone: "",
    home_phone: "",
    work_phone: "",
    email: "",
    state_or_province: "",
    country: "",
    city: "",
    postal_code: ""
  });

  const [error, setError] = useState({
    first_name: {
      required: false
    },
    last_name: {
      required: false
    },
    mobile_phone: {
      required: false
    }
  });

  const requiredData = e => {
    if (e.target.value.length === 0) {
      setError({
        ...error,
        [`${e.target.name}`]: {
          required: true
        }
      });
    } else {
      setError({
        ...error,
        [`${e.target.name}`]: {
          required: false
        }
      });
    }
  };

  function handleInput(e) {
    setContact({
      ...contact,
      [`${e.target.name}`]: e.target.value
    });
    requiredData(e);
  }

  const handleClose = e => {
    setOpen({ ...open, contact: false });
    setError({
      ...error,
      [`${e.target.name}`]: {
        required: false
      }
    });
  };

  const addContact = e => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3001/contacts/create`,
        {
          userid: match.params.id,
          ...contact
        },
        headers
      )
      .then(res => {
        alert("Contact Added");
        setOpen({ ...open, contact: false });
        setRows([...rows, res.data]);
        setAll([...all, res.data]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => {
          if (!contact) {
            handleClose();
          }
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Container style={{ outline: "none" }} component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Add contact
                <CloseButton onClick={handleClose} />
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="firstname"
                      label="Firstname"
                      name="first_name"
                      autoComplete="firstname"
                      onBlur={e => requiredData(e)}
                      value={contact.first_name}
                      onChange={handleInput}
                      error={error.first_name.required}
                      helperText={
                        !error.first_name.required ? "" : "Required to fill out"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="lastname"
                      label="Lastname"
                      name="last_name"
                      autoComplete="lastname"
                      onBlur={e => requiredData(e)}
                      value={contact.last_name}
                      onChange={handleInput}
                      error={error.last_name.required}
                      helperText={
                        !error.last_name.required ? "" : "Required to fill out"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="mobile_phone"
                      label="Mobile Phone"
                      type="number"
                      inputProps={{ pattern: "[0][9][0-9]{9}" }}
                      id="mobilephone"
                      autoComplete="mobile_phone"
                      onBlur={e => requiredData(e)}
                      value={contact.mobile_phone}
                      onChange={handleInput}
                      error={error.mobile_phone.required}
                      helperText={
                        !error.mobile_phone.required
                          ? ""
                          : "Required to fill out"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="homephone"
                      label="Home Phone"
                      type="homephone"
                      id="homephone"
                      autoComplete="homephone"
                      value={contact.home_phone}
                      onChange={e => {
                        setContact({ ...contact, home_phone: e.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="workphone"
                      label="Work Phone"
                      type="workphone"
                      id="workphone"
                      autoComplete="workphone"
                      value={contact.work_phone}
                      onChange={e => {
                        setContact({ ...contact, work_phone: e.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      id="email"
                      autoComplete="email"
                      value={contact.email}
                      onChange={e => {
                        setContact({ ...contact, email: e.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="country"
                      label="Country"
                      type="country"
                      id="country"
                      autoComplete="country"
                      value={contact.country}
                      onChange={e => {
                        setContact({ ...contact, country: e.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="stateOrProvince"
                      label="State/Province"
                      type="stateOrProvince"
                      id="stateOrProvince"
                      autoComplete="stateOrProvince"
                      value={contact.state_or_province}
                      onChange={e => {
                        setContact({
                          ...contact,
                          state_or_province: e.target.value
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="city"
                      label="City"
                      type="city"
                      id="city"
                      autoComplete="city"
                      value={contact.city}
                      onChange={e => {
                        setContact({ ...contact, city: e.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="postalCode"
                      label="Postal Code"
                      type="postalCode"
                      id="postalCode"
                      autoComplete="postalCode"
                      value={contact.postal_code}
                      onChange={e => {
                        setContact({ ...contact, postal_code: e.target.value });
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  style={{ cursor: "pointer" }}
                  onClick={e => addContact(e)}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Add
                </Button>
              </form>
            </div>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}
