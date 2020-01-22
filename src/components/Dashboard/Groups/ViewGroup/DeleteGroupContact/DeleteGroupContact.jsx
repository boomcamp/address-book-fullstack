import React, { useState } from 'react';
import axios from 'axios';

import { Close as CloseIcon} from '@material-ui/icons';
import {IconButton } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, } from '@material-ui/core';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeleteGroupContact({fetchGroupMembers, contactName, groupID, groupMemberID}) {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DeleteGroupContactFn = () => {
    axios({
      method: 'delete',
      url: `http://localhost:3002/api/group/${groupID}/${groupMemberID}`
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
      fetchGroupMembers();
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
      <IconButton onClick={handleClickOpen} style={{color: '#ff0000'}} aria-label="delete">
        <CloseIcon />
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
        <DialogTitle id="alert-dialog-title">{"Are you sure to remove this contact?"}</DialogTitle>
        <DialogContent>
          <Typography style={{textAlign: 'center'}} variant="overline" display="block" gutterBottom>
            {contactName}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => DeleteGroupContactFn()} color="primary" autoFocus>
            Remove
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default DeleteGroupContact;
