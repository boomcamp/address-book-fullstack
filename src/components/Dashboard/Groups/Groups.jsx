import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, TablePagination } from '@material-ui/core';
import { Chip, Avatar } from '@material-ui/core';
import { TextField, InputAdornment } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

import ViewGroup from './ViewGroup/ViewGroup';
import AddGroup from './AddGroup/AddGroup';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: '70vh',
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
    margin: '10px 2.5% 0 0',
  },
  addGroupDiv: {
    margin: '10px 1.5% 0 auto',
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-end',
  }
}));

function Groups({sessionid}) {

  const [groupList, setGroupList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [ activeSort, setActiveSort ] = useState(false);

  const [ sortDirection, setSortDirection ] = useState('desc');

  const fetchGroupsFn = () => {
    axios({
      method: 'get',
      url: `http://localhost:3002/api/groups/${sessionid}/${(sortDirection === 'asc') ? 'DESC' : 'ASC'}`
    })
    .then(response => {
      setGroupList(response.data);
      setSearchData(response.data);
    })
    .catch(error => {
      console.error(error);
    })
  }

  useEffect(() => {
    fetchGroupsFn();
    // eslint-disable-next-line
  }, [sortDirection])

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

  const onChangeHandle = e => {
    const filteredGroups = groupList.filter(el => el.groupName.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);
    setSearchData(filteredGroups); 
  }

  const sortByGroupName = () => {
    (activeSort) || setActiveSort(true);
    ( sortDirection === 'desc') ? setSortDirection('asc') : setSortDirection('desc');
  }

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Grid item xs={5} sm={3} md={2} lg={1} xl={1} className={classes.addGroupDiv}>
          <AddGroup fetchGroupsFn={fetchGroupsFn} />
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={2} xl={2} className={classes.searchDiv}>
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
                              <TableSortLabel onClick={sortByGroupName} active={activeSort} direction={sortDirection}>
                                Group
                              </TableSortLabel>
                            </TableCell>
                            <TableCell align="right" key="Actions" style={{minWidth: 30}} />    
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {searchData
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                              <TableRow hover tabIndex={-1} key={row.groupID}>
                                <TableCell>
                                  <Chip variant="outlined" color="primary" avatar={<Avatar>{row.groupName.substring(0,1).toUpperCase()}</Avatar>} label={row.groupName}/>
                                </TableCell>
                                <TableCell align="right" className={classes.actionBtn}>
                                  <ViewGroup fetchGroupsFn={fetchGroupsFn} data={row}/>
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
                    count={groupList.length}
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
      </Grid>
    </Grid>
  )
}

export default Groups;
