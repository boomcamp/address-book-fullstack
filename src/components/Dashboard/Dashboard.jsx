import React, { useState } from "react";
import Header from "../Header/Header";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import { Add, AccountCircle } from "@material-ui/icons";
import { Dialog, DialogContent, DialogActions, TextField, DialogTitle } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function Dashboard() {
  const columns = [
    { id: "First Name", label: "First Name", minWidth: 50 },
    { id: "Last Name", label: "Last Name", minWidth: 50 },
    {
      id: "Actions",
      label: "Actions",
      minWidth: 50,
      align: "right",
      format: value => value.toLocaleString()
    }
  ];

  const useStyles = makeStyles(theme => ({
    root: {
      width: "100%"
    },
    container: {
      maxHeight: 440
    },
    table: {
      marginTop: "1%"
    },
    paper: {
      height: "auto",
      width: "95%",
      margin: "auto",
      marginTop: theme.spacing(2),
      alignItems: "center",
      border: "none"
    },
    addBtn: {
      position: "fixed",
      width: "60px",
      height: "60px",
      bottom: "20px",
      right: "20px",
      background: "#f19208",
      color: "#fff",
      margin: "1% 0 0 0",
      "&:hover": {
        background: "#f9ac39",
        color: "#fff"
      }
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
  }));

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <React.Fragment>
      <Header />
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={11}>
          <Paper className={classes.paper}>
            <Grid item xs={12}>
              <Grid container direction="row" justify="center">
                <Paper className={classes.root}>
                  <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map(column => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody></TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={10}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={11}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Fab
              onClick={handleClickOpen}
              title="Add Contact"
              className={classes.addBtn}
              aria-label="add"
            >
              <Add />
            </Fab>
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="Add-Contact-Dialog" maxWidth='md' fullWidth>
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Add Contact
              </DialogTitle>
              <DialogContent dividers>
                <form className={classes.form}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField
                        autoFocus
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField
                        autoFocus
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <TextField
                        autoFocus
                        label="Home Number"
                        type="text"
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <TextField
                        autoFocus
                        label="Mobile Number"
                        type="text"
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <TextField
                        autoFocus
                        label="Work Number"
                        type="text"
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <TextField
                        autoFocus
                        label="Email address"
                        type="email"
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                      <TextField
                        autoFocus
                        label="City"
                        type="text"
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                      <TextField
                        autoFocus
                        label="State"
                        type="text"
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                      <TextField
                        autoFocus
                        label="Country"
                        type="text"
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                      <TextField
                        autoFocus
                        label="Postal Code"
                        type="text"
                        fullWidth
                        variant="outlined"  
                      />
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} color="secondary">
                  Discard
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Dashboard;
