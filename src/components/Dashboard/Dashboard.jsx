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
import { TableSortLabel } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Chip, Avatar, Typography } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import ViewContact from './ViewContact/ViewContact';
import EditContact from './EditContact/EditContact';
import DeleteContact from './DeleteContact/DeleteContact';

import { generator } from '../functions';

function Dashboard() {

  const useStyles = makeStyles(theme => ({
    root: {
      width: "100%"
    },
    container: {
      maxHeight: '70vh',
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
    searchDiv: {
      margin: '10px 2.5% 0',
      float: 'right'
    },
    searchField: {
      margin: 'auto'
    }
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

  const [ sortDirection, setSortDirection ] = useState('desc');

  const [searchData, setSearchData] = useState([]);

  const fetchContactsFn = () => {
    axios({
      method: 'get',
      url: `http://localhost:3002/api/contacts/${sessionid}/${(sortDirection === 'asc') ? 'DESC' : 'ASC'}`
    })
    .then(response => {
      setcontactList(response.data);
      setSearchData(response.data);
    })
    .catch(error => console.error(error))
  }

  const onChangeHandle = e => {
    const filteredContacts = contactList.filter(el => el.ab_firstName.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || el.ab_lastName.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 );
    setSearchData(filteredContacts); 
  }

  useEffect(() => {
    fetchContactsFn();
    // eslint-disable-next-line
  }, [sortDirection])

  const firstNameLetter = (name) => {
    return name.substring(0,1).toUpperCase();
  }

  const [ activeSort, setActiveSort ] = useState(false);

  const sortByLastnameFn = () => {
    (activeSort) || setActiveSort(true);
    ( sortDirection === 'desc') ? setSortDirection('asc') : setSortDirection('desc');
  }

  return (
    <React.Fragment>
      <Header />
      <Grid item xs={12} sm={4} md={4} lg={2} xl={2} className={classes.searchDiv}>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <TextField
            fullWidth
            className={classes.searchField}
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={onChangeHandle}
          />
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={11}>
          <Paper className={classes.paper}>
            <Grid item xs={12}>
              <Grid container direction="row" justify="center">
                <Paper className={classes.root}>
                  <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="inherit" key="Name" style={{minWidth: 30}}>
                            <TableSortLabel active={activeSort} onClick={sortByLastnameFn} direction={sortDirection}>
                              Name
                            </TableSortLabel>
                          </TableCell>
                          <TableCell align="inherit" key="Phone Number" style={{minWidth: 30}}>
                            Phone Number
                          </TableCell>
                          <TableCell align="right" key="Actions" style={{minWidth: 30}} />                            
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {searchData
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                          return (
                            <TableRow hover tabIndex={-1} key={row.abID}>
                              <TableCell>
                                <Chip variant="outlined" color="primary" avatar={<Avatar style={{background: generator()}}>{firstNameLetter(row.ab_firstName)}</Avatar>} label={row.ab_lastName+", "+row.ab_firstName}/>
                              </TableCell>
                              <TableCell>
                                <Typography variant="overline" display="block" noWrap={false}gutterBottom>
                                  {row.ab_mobile_phone ? row.ab_mobile_phone : 'N/A'}
                                </Typography>
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
                    style={{justifyContent: 'center', display: 'flex'}}
                    component="div"
                    rowsPerPageOptions={[10, 25, 100]}
                    count={searchData.length}
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
