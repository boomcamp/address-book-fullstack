import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles, /*useTheme*/ } from "@material-ui/core/styles";
import { Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, Grid, TextField} from '@material-ui/core';
//import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Select, Input, Chip, FormControl, InputLabel, MenuItem } from '@material-ui/core';

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
  },
  memberSelect: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  member: {
    margin: 2,
  },
}));

function AddGroup({fetchGroupsFn}) {

  const sessionid = localStorage.getItem('sessionid');

  const [contacts, setContacts] = useState([]);
  
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
  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [groupData, setGroupData] = useState({
    groupName: '',
    groupMembersByID: [],
    groupMembers: []
  })

  // const returnMember = (val) => {
  //   let newArray = [];
  //   let newArrayByID = [];

  //   for(let value of val){
  //     let split = value.split('+');
  //     newArray.push((split[0]));
  //     newArrayByID.push((split[split.length-1]));
  //   }
  //   setGroupData({...groupData, groupMembersByID: newArrayByID})
  //   console.log(groupData)
  //   return newArray;
  // }

  const onChangeHandle = (e) => {
    setGroupData({
      ...groupData, 
      [e.target.name]: /*(e.target.name === "groupMembers") ? returnMember(e.target.value) :*/ e.target.value
    })
  } 

  const addGroupFn = (e) => {
    e.preventDefault();
    console.log(groupData);
    //fetchGroupsFn();
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
      <Dialog disableBackdropClick /*disableEscapeKeyDown*/ /*fullScreen={fullScreen}*/ open={open} onClose={handleClose} aria-labelledby="Add-Group-Dialog" maxWidth='md' fullWidth>
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
              <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Members:</InputLabel>
                <Select
                  multiple
                  name="groupMembers"
                  autoWidth={true}
                  value={groupData.groupMembers}
                  onChange={onChangeHandle}
                  input={<Input id="select-members" />}
                  renderValue={selected => (
                    <div className={classes.memberSelect}>
                      {selected.map(value => (
                        <Chip key={value} label={value} className={classes.member} />
                      ))}
                    </div>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        height: '100',
                        width: '500px',
                      },
                    },
                  }}
                >HTMLTableRowHTMLTableRowElement
                  {contacts.map(row => (
                    <MenuItem key={row.abID} value={row.ab_firstName+" "+row.ab_lastName+"+"+row.abID} >
                      {row.ab_firstName+" "+row.ab_lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>
            </Grid>         
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>       
      </Dialog>
    </React.Fragment>
  )
}

export default AddGroup;
