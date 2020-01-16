import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "../Header/Header";
import AddContact from "./AddContact/AddContact";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";

import ViewContact from './ViewContact/ViewContact';
import EditContact from './EditContact/EditContact';
import DeleteContact from './DeleteContact/DeleteContact';

function Dashboard() {
  const columns = [
    { id: "Name", label: "Name", minWidth: 30 },
    { id: "Phone Number", label: "Phone Number", minWidth: 30 },
    {
      id: "Actions",
      label: "Actions",
      minWidth: 30,
      align: "right",
      format: value => value.toLocaleString()
    }
  ];

  const useStyles = makeStyles(theme => ({
    root: {
      width: "100%"
    },
    container: {
      maxHeight: 840
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

  const sessionid = localStorage.getItem('sessionid');

  const [contactList, setcontactList] = useState([]);

  const fetchContactsFn = () => {
    axios({
      method: 'get',
      url: `http://localhost:3002/api/contacts/${sessionid}`
    })
    .then(response => {
      setcontactList(response.data);
    })
    .catch(error => console.error(error))
  }

  useEffect(() => {
    fetchContactsFn();
    // eslint-disable-next-line
  }, [])

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
                      <TableBody>
                      {contactList
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(row => {
                          return (
                            <TableRow hover tabIndex={-1} key={row.abID}>
                              <TableCell>
                                {row.ab_firstName+" "+row.ab_lastName}
                              </TableCell>
                              <TableCell>
                                {row.ab_mobile_phone ? row.ab_mobile_phone : 'N/A'}
                              </TableCell>
                              <TableCell align="right" className={classes.actionBtn}>
                                <ViewContact data={row} />
                                <EditContact fetchContactsFn={fetchContactsFn} data={row} />
                                <DeleteContact fetchContactsFn={fetchContactsFn} contactName={row.ab_firstName+" "+row.ab_lastName} contactID={row.abID} />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
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
          <AddContact fetchContactsFn={fetchContactsFn} sessionid={sessionid}/>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Dashboard;
