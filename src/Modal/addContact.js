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
import axios from "axios";
import * as ls from "local-storage";
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

export default function AddContactModal({ open, setOpen }) {
  const classes = useStyles();
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    homePhone: "",
    mobilePhone: "",
    workPhone: "",
    email: "",
    city: "",
    stateOrProvince: "",
    postalCode: "",
    country: ""
  });
  const header = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ls.get.token}`
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addContact = e => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3001/contacts/${ls.get("auth").id}`,
        {
          first_name: contact.firstName,
          last_name: contact.lastName,
          home_phone: contact.homePhone,
          mobile_phone: contact.mobilePhone,
          work_phone: contact.workPhone,
          email: contact.email,
          city: contact.city,
          state_or_province: contact.stateOrProvince,
          postal_code: contact.postalCode,
          country: contact.country
        },
        {
          headers: header
        }
      )
      .then(() => alert("Successfully Added"))
      .catch(error => {
        try {
          alert("Please complete the form");
        } catch {
          console.log(error);
        }
      });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Add contact
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoFocus
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="firstname"
                      label="Firstname"
                      name="firstname"
                      autoComplete="firstname"
                      value={contact.firstName}
                      onChange={e => {
                        setContact({ ...contact, firstName: e.target.value });
                      }}
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
                      name="lastname"
                      autoComplete="lastname"
                      value={contact.lastName}
                      onChange={e => {
                        setContact({ ...contact, lastName: e.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="mobilephone"
                      label="Mobile Phone"
                      type="mobilephone"
                      id="mobilephone"
                      autoComplete="mobilephone"
                      value={contact.mobilePhone}
                      onChange={e => {
                        setContact({ ...contact, mobilePhone: e.target.value });
                      }}
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
                      value={contact.homePhone}
                      onChange={e => {
                        setContact({ ...contact, homePhone: e.target.value });
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
                      value={contact.workPhone}
                      onChange={e => {
                        setContact({ ...contact, workPhone: e.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
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
                      value={contact.stateOrProvince}
                      onChange={e => {
                        setContact({
                          ...contact,
                          stateOrProvince: e.target.value
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
                      value={contact.postalCode}
                      onChange={e => {
                        setContact({ ...contact, postalCode: e.target.value });
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  onClick={e => addContact(e)}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Confirm
                </Button>
              </form>
            </div>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}
