import React, {Fragment, useState} from 'react';
import axios from 'axios';

import {IconButton } from '@material-ui/core';
import {Delete as DeleteIcon} from '@material-ui/icons'; 
import { makeStyles } from '@material-ui/core/styles';

import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, } from '@material-ui/core';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(theme => ({
  deleteBtn: {
    color: '#d40054',
  },
}));

function DeleteContactM({ contactName, contactID, fetchContactsFn }) {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteContactFn = () => {
    axios({
      method: 'delete',
      url: `http://localhost:3002/api/contact/${contactID}`
    })
    .then(() => {
      toast.success("Contact Deleted", {
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

  const classes = useStyles();
  return (
    <Fragment>
      <IconButton onClick={handleClickOpen} aria-label="delete" className={classes.deleteBtn}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
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
        <DialogTitle id="alert-dialog-title" className={classes.center} >{"Delete Contact?"}</DialogTitle>
        <DialogContent className={classes.center}>
          <Typography variant="overline" display="block" gutterBottom>
            {contactName}
          </Typography>
        </DialogContent>
        <DialogActions className={classes.center} >
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => deleteContactFn()} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DeleteContactM
