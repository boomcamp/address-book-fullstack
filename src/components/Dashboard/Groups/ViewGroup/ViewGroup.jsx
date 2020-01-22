import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button } from '@material-ui/core';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid} from "@material-ui/core";
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination } from '@material-ui/core';
import { TextField, IconButton } from '@material-ui/core';
import { Check as CheckIcon, Close as CloseIcon, Edit as EditIcon } from '@material-ui/icons';

import DeleteGroup from './DeleteGroup/DeleteGroup';
import DeleteGroupContact from './DeleteGroupContact/DeleteGroupContact';
import AddGroupContacts from './AddGroupContacts/AddGroupContacts';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(theme => ({
  viewBtn: {
    marginRight: '5%'
  },
  groupName: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

function ViewGroup({ data, fetchGroupsFn, deleteNotif }) {

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [members, setMembers] = useState([]);

  const fetchGroupMembers = () => {
    axios({
      method: 'get',
      url: `http://localhost:3002/api/group/${data.groupID}/contacts`
    })
    .then(response => setMembers(response.data))
    .catch(error => console.error(error))
  }

  useEffect(() => {
    fetchGroupMembers();
    // eslint-disable-next-line
  }, [])

  const [editName, setEditName] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const nameHandleChange = (e) => {
    setNewGroupName(e.target.value);
  }

  const EditGroupNameFn = (e) => {
    e.preventDefault();
    axios({
      method: 'patch',
      url: `http://localhost:3002/api/group/${data.groupID}`,
      data: {groupName: `${newGroupName}`}
    })
    .then(() => {
      toast.success("Updated", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      setEditName(false);
      fetchGroupsFn();
    })
    .catch(() => {
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

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} variant="outlined" size="large" color="primary" className={classes.viewBtn}>
        VIEW
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="Add-Group-Dialog" maxWidth='md' fullWidth>
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
        <DialogTitle className={classes.groupName}>
          {(editName) 
            ?
            <form onSubmit={EditGroupNameFn}>
              <TextField autoFocus required onChange={nameHandleChange} style={{marginTop: '2.5%'}} defaultValue={data.groupName} />
              <IconButton type="submit" style={{color: '#3bfa25'}} aria-label="save">
                <CheckIcon />
              </IconButton>
              <IconButton onClick={() => setEditName(false)} style={{color: '#f00018'}} aria-label="discard">
                <CloseIcon />
              </IconButton>
            </form>
            :
            <div style={{display: 'inline-flex'}}>
              <span style={{marginTop: '2.3%', display: 'flex', alignItems: 'center'}}>{data.groupName}</span>
              <IconButton onClick={() => setEditName(true)} style={{color: '#fc7b03'}} aria-label="edit">
                <EditIcon />
              </IconButton>
              <DeleteGroup data={data} deleteNotif={deleteNotif} handleCloseMainDialog={handleClose} fetchGroupsFn={fetchGroupsFn} />
            </div>            
          }
        </DialogTitle>
          <DialogContent dividers>   
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.root}>
                  <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" key="members" >
                            Members
                          </TableCell>
                          <TableCell key="actions" align="right" style={{minWidth: 30}}/>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {members
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                          return (
                            <TableRow hover tabIndex={-1} key={row.groupMember_ID}>
                              <TableCell align="center">
                                {row.ab_firstName+" "+row.ab_lastName}
                              </TableCell>
                              <TableCell align="right">
                                <DeleteGroupContact groupID={data.groupID} groupMemberID={row.groupMember_ID} contactName={row.ab_firstName+" "+row.ab_lastName} fetchGroupMembers={fetchGroupMembers}/>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    style={{justifyContent: 'flex-start', display: 'flex'}}
                    component="div"
                    rowsPerPageOptions={[10, 25, 100]}
                    count={members.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Paper>
              </Grid>
            </Grid>         
          </DialogContent>
          <DialogActions>
            <AddGroupContacts fetchGroupMembers={fetchGroupMembers} data={data}/>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
          </DialogActions>    
      </Dialog>
    </React.Fragment>
  )
}

export default ViewGroup;
