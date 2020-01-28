import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from "@material-ui/core/styles";
import { Fab } from '@material-ui/core';
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons';
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, Grid, TextField} from '@material-ui/core';
import { Select, Input, FormControl, InputLabel, MenuItem, FormHelperText } from '@material-ui/core';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(theme => ({
  addBtn: {
    margin: 'auto'
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  }
}));

function AddGroup({fetchGroupsFn}) {

  const sessionid = localStorage.getItem('sessionid');

  const [contacts, setContacts] = useState([]);

  const [addMembers, setAddMembers] = useState(false);
  
  const fetchContactsFn = () => {
    axios({
      method: 'get',
      url: `http://localhost:3002/api/contacts/${sessionid}/ASC`
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

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onCloseSelectHandle();
    setOpen(false);
  };

  const [groupData, setGroupData] = useState({
    groupName: '',
    groupMembers: []
  })

  const onChangeHandle = (e) => {
    setGroupData({
      ...groupData, 
      [e.target.name]: e.target.value
    })
  } 

  const [formError, setFormError] = useState(false);

  const addGroupFn = (e) => {
    e.preventDefault();
    if(addMembers && groupData.groupMembers.length === 0){
      setFormError(true)
    }else{
      setFormError(true);
      axios({
        method: 'POST',
        url: `http://localhost:3002/api/group/${sessionid}`,
        data: groupData
      })
      .then(response => {
        toast.success("Group Added", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        fetchGroupsFn();
      })
      .catch(error => {
        toast.error("Sorry! Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      })
      onCloseSelectHandle();
      setOpen(false);
    }
  }

  const onCloseSelectHandle = () => {
    setAddMembers(false);
    setGroupData({...groupData, groupMembers: []})
  }

  return (
    <React.Fragment>
      <Fab
        variant="extended"
        size="small"
        color="primary"
        aria-label="add"     
        className={classes.addBtn}
        onClick={handleClickOpen} 
      >
        <AddIcon />
        Add Group
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="Add-Group-Dialog" maxWidth='md' fullWidth>
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
        <DialogTitle>Add Group</DialogTitle>
        <form onSubmit={addGroupFn} className={classes.form}>
          <DialogContent dividers>   
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} style={{display: 'flex', justifyContent: 'center'}}>
                <TextField
                  label="Group Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  name="groupName"
                  autoFocus
                  onChange={onChangeHandle}
                />
              </Grid>
              {(addMembers) && 
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-chip-label">Members:</InputLabel>
                    <Select
                      multiple
                      error={formError}
                      name="groupMembers"
                      autoWidth={true}
                      value={groupData.groupMembers}
                      onChange={onChangeHandle}
                      input={<Input id="select-members" />}
                    >HTMLTableRowHTMLTableRowElement
                      {contacts.map(row => (
                        <MenuItem key={row.abID} value={row.abID} >
                          {row.ab_firstName+" "+row.ab_lastName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={formError}>Please select at least 1 contact</FormHelperText>
                  </FormControl>
                </Grid>
              }
              <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                {(addMembers) ?
                  <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                    style={{background: 'none', color: '#000'}}
                    onClick={onCloseSelectHandle}
                  >
                    <CloseIcon />
                    Cancel
                  </Fab>
                  :
                  <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                    style={{background: 'none', color: '#000'}}
                    onClick={() => setAddMembers(true)}
                  >
                    <AddIcon />
                    Add Members
                  </Fab>
                }
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

export default AddGroup;
