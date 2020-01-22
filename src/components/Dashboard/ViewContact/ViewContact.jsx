import React, { useState } from 'react';
import axios from 'axios';
import { Fab, Tooltip } from "@material-ui/core";
import { Dialog, DialogContent, DialogActions, TextField, DialogTitle } from "@material-ui/core";
import {Button, ButtonGroup, IconButton} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Visibility , Edit as EditIcon } from '@material-ui/icons';
import Hidden from '@material-ui/core/Hidden';

import DeleteContactM from '../DeleteContact/Mobile/DeleteContactM';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewContact({data, fetchContactsFn}) {

  const useStyles = makeStyles(theme => ({
    view: {
      color: '#fff',
      background: '#3d6dd0',
      '&:hover': {
        background: '#2a4d94'
      }
    },
    deleteBtn: {
      color: '#d40054',
    },
    editBtn: {
      color: '#f19208',
    },
    title: {
      padding: '2%'
    },
    titleDiv: {
      display: 'flex', 
      flexDirection: 'row'
    },
    deleteDiv: {
      margin: 'auto 0 auto 1%'
    }
  }));

  const classes = useStyles();

  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
  }

  const handleCloseEdit = () => {
    setEdit(false);
  }

  const onHandleField = (e) => {
    setEditedDetails({...editedDetails, [e.target.name]: (e.target.value) === '' ? null : e.target.value})
  }

  const onSubmitEditFn = (e) => {
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
    handleClose();
  }
  

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <React.Fragment>
      <Hidden only={['xs', 'sm']} >
        <Tooltip title="View Contact" placement="bottom" arrow>
          <Fab size="medium" onClick={handleClickOpen} className={classes.view} aria-label="view">
            <Visibility />
          </Fab>
        </Tooltip>
      </Hidden>
      <Hidden only={['xl', 'lg', 'md']}>
        <ButtonGroup size="small" variant="text">
          <Tooltip title="View Contact" placement="bottom" arrow>
            <Button onClick={handleClickOpen} style={{color: '#3d6dd0'}}>
              <Visibility />
            </Button>
          </Tooltip>
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
        <DialogTitle className={classes.title} id="customized-dialog-title" onClose={handleClose}>
          <div className={classes.titleDiv}>
            <span style={{margin: 'auto'}}>{data.ab_lastName+ ", " + data.ab_firstName}</span>
            {(edit) || 
              <Hidden only={['sm','md','lg','xl']}>
                <div style={{display: 'flex', justifyContent: 'space-between', flexGrow: 2}}>
                  <div>
                    <Tooltip title="Edit Contact" placement="right" arrow>
                      <IconButton onClick={handleEdit} style={{paddingLeft: 1}} aria-label="edit" className={classes.editBtn}>
                        <EditIcon style={{fontSize: '20px'}}/>
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div className={classes.deleteDiv}>
                    <DeleteContactM fetchContactsFn={fetchContactsFn} contactName={data.ab_firstName+" "+data.ab_lastName} contactID={data.abID} key="Mobile-Delete"/>
                  </div>
                </div>
              </Hidden>
            }
          </div>
        </DialogTitle>
        {edit 
        ?
        <form onSubmit={onSubmitEditFn}>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  name="firstname"
                  label="First Name"
                  defaultValue={(data.ab_firstName) ? data.ab_firstName : ''}
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  onChange={onHandleField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoFocus={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  name="lastname" 
                  label="Last Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  onChange={onHandleField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={(data.ab_lastName) ? data.ab_lastName : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  name="home_phone"
                  label="Home Number"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={onHandleField}
                  defaultValue={(data.ab_home_phone) ? data.ab_home_phone : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  name="mobile_phone"
                  label="Mobile Number"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  onChange={onHandleField}
                  defaultValue={(data.ab_mobile_phone) ? data.ab_mobile_phone : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  name="work_phone"
                  label="Work Number"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={onHandleField}
                  defaultValue={(data.ab_work_phone) ? data.ab_work_phone : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  name="email"
                  label="Email address"
                  type="email"
                  fullWidth
                  variant="outlined"
                  required
                  onChange={onHandleField}
                  defaultValue={(data.ab_email) ? data.ab_email : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <TextField
                  name="city"
                  label="City"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  onChange={onHandleField}
                  defaultValue={(data.ab_city) ? data.ab_city : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <TextField
                  name="state"
                  label="State"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  onChange={onHandleField}
                  defaultValue={(data.ab_state) ? data.ab_state : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <TextField
                  name="country"
                  label="Country"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  onChange={onHandleField}
                  defaultValue={(data.ab_country) ? data.ab_country : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <TextField
                  name="postal_code"
                  label="Postal Code"
                  type="text"
                  fullWidth
                  variant="outlined" 
                  required
                  onChange={onHandleField}
                  defaultValue={(data.ab_postal_code) ? data.ab_postal_code : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" type="submit">
              Save
            </Button> 
            <Button onClick={handleCloseEdit} color="secondary">
              Discard
            </Button>
          </DialogActions>
        </form>
        :
        <React.Fragment>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="First Name"
                  defaultValue={(data.ab_firstName) ? data.ab_firstName : ''}
                  type="text"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: true
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Last Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: true
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={(data.ab_lastName) ? data.ab_lastName : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  label="Home Number"
                  type="text"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: true
                  }}
                  defaultValue={(data.ab_home_phone) ? data.ab_home_phone : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  label="Mobile Number"
                  type="text"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: true
                  }}
                  defaultValue={(data.ab_mobile_phone) ? data.ab_mobile_phone : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  label="Work Number"
                  type="text"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: true
                  }}
                  defaultValue={(data.ab_work_phone) ? data.ab_work_phone : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  label="Email address"
                  type="email"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: true
                  }}
                  defaultValue={(data.ab_email) ? data.ab_email : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <TextField
                  label="City"
                  type="text"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: true
                  }}
                  defaultValue={(data.ab_city) ? data.ab_city : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <TextField
                  label="State"
                  type="text"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: true
                  }}
                  defaultValue={(data.ab_state) ? data.ab_state : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <TextField
                  label="Country"
                  type="text"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: true
                  }}
                  defaultValue={(data.ab_country) ? data.ab_country : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <TextField
                  label="Postal Code"
                  type="text"
                  fullWidth
                  variant="outlined" 
                  InputProps={{
                    readOnly: true
                  }} 
                  defaultValue={(data.ab_postal_code) ? data.ab_postal_code : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
          </DialogActions>
        </React.Fragment>
        }
      </Dialog>
    </React.Fragment>
  )
}

export default ViewContact;
