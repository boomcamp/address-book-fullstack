import React, { useState } from 'react';
import axios from 'axios';

import { IconButton } from '@material-ui/core';
import { Delete as DeleteIcon} from '@material-ui/icons';
import { Dialog, DialogTitle, Typography, DialogActions, Button, } from '@material-ui/core';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeleteGroup({data, fetchGroupsFn, handleCloseMainDialog, deleteNotif}) {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DeleteGroupFn = () => {
    axios({
      method: 'delete',
      url: `http://localhost:3002/api/group/${data.groupID}`,
    })
    .then(() => {
      handleCloseMainDialog();
      fetchGroupsFn();
      deleteNotif();
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
        <DialogTitle style={{display: 'flex', alignItems: 'center'}} id="alert-dialog-title">
          <Typography style={{textAlign: 'center'}} variant="overline" display="block" gutterBottom>
            Are you sure to remove {data.groupName}?
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => DeleteGroupFn()} color="primary" autoFocus>
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

export default DeleteGroup
