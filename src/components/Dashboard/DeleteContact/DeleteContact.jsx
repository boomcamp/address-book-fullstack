import React, { useState } from 'react';
import axios from 'axios';

import { makeStyles } from "@material-ui/core/styles";
import { Fab, Tooltip } from "@material-ui/core";
import { DeleteOutline } from '@material-ui/icons';
import { Button, Hidden, ButtonGroup } from '@material-ui/core';
import { Dialog, DialogContent, DialogActions, DialogTitle } from "@material-ui/core";
import { Typography } from '@material-ui/core';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeleteContact({ fetchContactsFn, contactID, contactName }) {
  const useStyles = makeStyles(theme => ({
    delete: {
      color: '#fff',
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    center: {
      display: 'flex', 
      justifyContent: 'center'
    }
  }));

  const classes = useStyles();

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

  return (
    <React.Fragment>
      <Hidden only={['xs', 'sm']} >
        <Tooltip title="Delete Contact" placement="bottom" arrow>
          <Fab size="medium" onClick={handleClickOpen} color="secondary" className={classes.delete} aria-label="delete">
            <DeleteOutline />
          </Fab>
        </Tooltip>
      </Hidden>
      <Hidden only={['xl', 'lg', 'md']}>
        <ButtonGroup size="small" variant="text">
          <Tooltip title="Delete Contact" placement="bottom" arrow>
            <Button onClick={handleClickOpen} color="secondary"><DeleteOutline /></Button>
          </Tooltip>
        </ButtonGroup>
      </Hidden>
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
    </React.Fragment>
  )
}

export default DeleteContact
