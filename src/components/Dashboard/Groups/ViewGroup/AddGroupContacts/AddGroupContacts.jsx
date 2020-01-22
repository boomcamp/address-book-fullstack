import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid} from "@material-ui/core";
import { Select, Input, InputLabel, FormControl, MenuItem, FormHelperText } from '@material-ui/core';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
}));

function AddGroupContacts({data, fetchGroupMembers}) {

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [contacts, setContacts] = useState([]);

  const [members, setMembers] = useState([]);

  const fetchContactsFn = () => {
    axios({
      method: 'get',
      url: `http://localhost:3002/api/group/${data.groupID}/not_in_group`
    })
    .then(response => {
      setContacts(response.data);
    })
    .catch(error => console.error(error))
  }

  useEffect(() => {
    fetchContactsFn();
    // eslint-disable-next-line
  }, [])

  const onChangeHandle = (e) => {
    setMembers(e.target.value)
  }

  const [showError, setShowError ] = useState(false);

  const onSubmitFn = (e) => {
    e.preventDefault();
    if(members.length === 0){
      setShowError(true);
    }else{
      setShowError(false);
      axios({
        method: 'POST',
        url: `http://localhost:3002/api/group/${data.groupID}/add`,
        data: {groupMembers: setMembers}
      })
      .then(response => {
        toast.success("Success! Members added.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        setMembers([]);
        fetchGroupMembers();
        setOpen(false);
      })
      .catch(error => {
        toast.error("Sorry! Please Try again", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      })
    }
  }

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} color="primary">
        Add Members
      </Button>
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
          Add Contacts to {data.groupName}
        </DialogTitle>
        <form onSubmit={onSubmitFn} className={classes.form}>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-chip-label">Members:</InputLabel>
                  <Select
                    error={showError}
                    multiple
                    name="members"
                    autoWidth={true}
                    value={members}
                    onChange={onChangeHandle}
                    input={<Input id="select-members" />}
                  >HTMLTableRowHTMLTableRowElement
                    {contacts.map(row => (
                      <MenuItem key={row.abID} value={row.abID} >
                        {row.ab_firstName+" "+row.ab_lastName}
                      </MenuItem>
                    ))}
                  </Select>
                  {(showError) &&
                  <FormHelperText error={showError}>Please select at least 1 contact</FormHelperText>
                  }
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              Add
            </Button>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  )
}

export default AddGroupContacts;
