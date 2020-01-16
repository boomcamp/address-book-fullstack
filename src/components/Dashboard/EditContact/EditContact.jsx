import React, { useState } from 'react';
import Fab from "@material-ui/core/Fab";
import { Dialog, DialogContent, DialogActions, TextField, DialogTitle } from "@material-ui/core";
import {Button, ButtonGroup} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Edit } from '@material-ui/icons';
import Hidden from '@material-ui/core/Hidden';
import axios from 'axios';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditContact({data, fetchContactsFn}) {

  const useStyles = makeStyles(theme => ({
    edit: {
      margin: '0 1%',
      color: '#fff',
      background: '#f19208',
      '&:hover': {
        background: '#cf7c04'
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

  const [editedDetails, setEditedDetails] = useState({
    firstname: data.ab_firstName,
    lastname: data.ab_lastName,
    home_phone: data.ab_home_phone,
    mobile_phone: data.ab_mobile_phone,
    work_phone: data.ab_work_phone,
    city: data.ab_city,
    email: data.ab_email,
    state: data.ab_state,
    postal_code: data.ab_postal_code,
    country: data.ab_country,
  });

  const onHandleField = (e) => {
    setEditedDetails({...editedDetails, [e.target.name]: (e.target.value) === '' ? null : e.target.value})
  }

  const updateContactFn = (e) => {
    e.preventDefault();  
    axios({
      method: 'patch',
      url: `http://localhost:3002/api/contact/${data.abID}`,
      data: editedDetails
    })
    .then(response => {
      toast.success("Contact Details Updated. :>", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
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
    setOpen(false);
  }

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <React.Fragment>
      <Hidden only={['xs', 'sm']} >
        <Fab size="medium" onClick={handleClickOpen} className={classes.edit} aria-label="edit">
          <Edit />
        </Fab>
      </Hidden>
      <Hidden only={['xl', 'lg', 'md']}>
        <ButtonGroup size="small" variant="text">
          <Button onClick={handleClickOpen} style={{color: '#f19208'}}>
            <Edit />
          </Button>
        </ButtonGroup>
      </Hidden>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="Add-Contact-Dialog" maxWidth='md' fullWidth>
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
        <form onSubmit={updateContactFn} className={classes.form}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Edit Contact
          </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      label="First Name"
                      defaultValue={(data.ab_firstName) ? data.ab_firstName : ''}
                      type="text"
                      fullWidth
                      variant="outlined"
                      name="firstname"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={onHandleField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      label="Last Name"
                      type="text"
                      fullWidth
                      variant="outlined"
                      name="lastname" 
                      defaultValue={(data.ab_lastName) ? data.ab_lastName : ''}
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      defaultValue={(data.ab_home_phone) ? data.ab_home_phone : ''}
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      defaultValue={(data.ab_mobile_phone) ? data.ab_mobile_phone : ''}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={onHandleField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <TextField
                      label="Work Number"
                      type="text"
                      fullWidth
                      variant="outlined"
                      name="work_phone"
                      defaultValue={(data.ab_work_phone) ? data.ab_work_phone : ''}
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      defaultValue={(data.ab_email) ? data.ab_email : ''}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={onHandleField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <TextField
                      label="City"
                      type="text"
                      fullWidth
                      variant="outlined"
                      name="city"
                      defaultValue={(data.ab_city) ? data.ab_city : ''}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={onHandleField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <TextField
                      label="State"
                      type="text"
                      fullWidth
                      variant="outlined"
                      name="state"
                      defaultValue={(data.ab_state) ? data.ab_state : ''}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={onHandleField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <TextField
                      label="Country"
                      type="text"
                      fullWidth
                      variant="outlined"
                      name="country"
                      defaultValue={(data.ab_country) ? data.ab_country : ''}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={onHandleField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <TextField
                      label="Postal Code"
                      type="text"
                      fullWidth
                      variant="outlined" 
                      name="postal_code"
                      defaultValue={(data.ab_postal_code) ? data.ab_postal_code : ''}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={onHandleField}
                    />
                  </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Close
              </Button>
              <Button type="submit" color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
      </Dialog>
    </React.Fragment>
  )
}

export default EditContact;
