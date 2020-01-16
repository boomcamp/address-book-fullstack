import React, { useState } from 'react';
import { Fab, Tooltip } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Dialog, DialogContent, DialogActions, TextField, DialogTitle } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import axios from 'axios';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddContact(props) {

  const { sessionid, fetchContactsFn } = props;

  const useStyles = makeStyles(theme => ({
    addBtn: {
      position: "fixed",
      width: "60px",
      height: "60px",
      bottom: "20px",
      right: "20px",
      background: "#f19208",
      color: "#fff",
      margin: "1% 0 0 0",
      "&:hover": {
        background: "#f9ac39",
        color: "#fff"
      }
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
  }));

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [contactData, setContactData] = useState({
    firstname: "",
    lastname: "",
    work_phone: null,
    city: "",
    email: null,
    state: "",
    postal_code: "",
    country: "",
    mobile_phone: "",
    home_phone: null,
  });

  const onHandleField = (e) => {
    setContactData({...contactData, [e.target.name]: e.target.value})
  }

  const addContactFn = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: `http://localhost:3002/api/contact/${sessionid}`,
      data: contactData
    })
    .then(() => {
      toast.success("Success! Contact Added. :>", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      setContactData({
        firstname: "",
        lastname: "",
        work_phone: null,
        city: "",
        email: null,
        state: "",
        postal_code: "",
        country: "",
        mobile_phone: null,
        home_phone: null,
      })
      fetchContactsFn();  
    })
    .catch(error => {
      console.error(error);
      toast.error("Something went wrong. Please try again.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    })
    handleClose();
  }

  return (
    <React.Fragment>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Tooltip title="Add Contact" placement="left" arrow>
        <Fab
          onClick={handleClickOpen}
          className={classes.addBtn}
          aria-label="add"
        >
          <Add />
        </Fab>
      </Tooltip>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="Add-Contact-Dialog" maxWidth='md' fullWidth>
      <form onSubmit={addContactFn} className={classes.form}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Contact
        </DialogTitle>
          <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    required
                    name="firstname"
                    onChange={onHandleField}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    required
                    name="lastname"
                    onChange={onHandleField}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    label="Home Number"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="home_phone"
                    onChange={onHandleField}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    label="Mobile Number"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="mobile_phone"
                    onChange={onHandleField}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    label="Work Number"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="work_phone"
                    onChange={onHandleField}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    label="Email address"
                    type="email"
                    fullWidth
                    variant="outlined"
                    name="email"
                    onChange={onHandleField}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <TextField
                    label="City"
                    type="text"
                    fullWidth
                    variant="outlined"
                    required
                    name="city"
                    onChange={onHandleField}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <TextField
                    label="State"
                    type="text"
                    fullWidth
                    variant="outlined"
                    required
                    name="state"
                    onChange={onHandleField}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <TextField
                    label="Country"
                    type="text"
                    fullWidth
                    variant="outlined"
                    required
                    name="country"
                    onChange={onHandleField}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <TextField
                    label="Postal Code"
                    type="text"
                    fullWidth
                    variant="outlined"  
                    required
                    name="postal_code"
                    onChange={onHandleField}
                  />
                </Grid>
              </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Discard
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  )
}

export default AddContact;
