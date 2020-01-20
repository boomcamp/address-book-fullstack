import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import Delete from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Axios from "axios";
import * as ls from "local-storage";
import Layout from "../Layout/layout";
import EditContactModal from "../Modal/editContact";
import DeleteContactModal from "../Modal/deleteContact";
import GroupedContact from "../Layout/selectGroup";
import AddToGroup from "../Layout/addToGroup";
import TablePaginationActions from "../Layout/tablePagination";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function Contacts({ match, history }) {
  const classes = useStyles();
  const [stat, setStat] = useState(false);
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState([]);
  const [all, setAll] = useState([]);
  const [groups, setGroups] = useState([]);
  const auth = ls.get("auth");
  const [open, setOpen] = useState(false);
  const [getContact, setGetContact] = useState({});
  const [openDelete, setOpenDelete] = useState({
    status: false,
    id: ""
  });
  const headers = {
    headers: {
      Authorization: `Bearer ${ls.get("auth")}`
    }
  };
  const handleOpen = () => setOpen(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortItems = value => {
    Axios.get(
      `http://localhost:3001/contacts/list/${match.params.id}?sort=${value}`,
      headers
    ).then(res => setRows(res.data));
  };

  if (!auth) {
    history.push("/");
  } else {
    if (!stat) {
      Axios.get(
        `http://localhost:3001/contacts/list/${match.params.id}?sort=first_name`,
        headers
      ).then(res => {
        setRows(res.data);
        setFilter(res.data);
        setAll(res.data);
      });
      setStat(true);
    }
  }

  return (
    <Layout
      history={history}
      user={ls.get("user")}
      auth={auth}
      headers={headers}
      match={match}
      setRows={setRows}
      rows={rows}
      filter={filter}
      setAll={setAll}
      all={all}
      setGroups={setGroups}
      groups={groups}
    >
      <TableContainer component={Paper}>
        <GroupedContact
          match={match}
          headers={headers}
          setRows={setRows}
          all={all}
          setGroups={setGroups}
          groups={groups}
        />
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <Tooltip title="Sort by Name">
                <StyledTableCell
                  align="center"
                  style={{ cursor: "pointer" }}
                  onClick={() => sortItems("first_name")}
                >
                  Firstname
                </StyledTableCell>
              </Tooltip>
              <Tooltip title="Sort by Lastname">
                <StyledTableCell
                  align="center"
                  style={{ cursor: "pointer" }}
                  onClick={() => sortItems("last_name")}
                >
                  Lastname
                </StyledTableCell>
              </Tooltip>
              <StyledTableCell align="center">Phone Number</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell align="center" style={{ cursor: "pointer" }}>
                  {row.first_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.last_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.mobile_phone}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Tooltip title="Edit" arrow>
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleOpen();
                        setGetContact(row);
                      }}
                    />
                  </Tooltip>
                  <AddToGroup
                    style={{ cursor: "pointer" }}
                    match={match}
                    headers={headers}
                    idContact={row.id}
                  />
                  <Tooltip title="Delete" arrow>
                    <Delete
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setOpenDelete({ status: true, id: row.id });
                      }}
                    />
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                labelRowsPerPage={null}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <EditContactModal
        open={open}
        setOpen={setOpen}
        getContact={getContact}
        headers={headers}
      />
      <DeleteContactModal
        open={openDelete.status}
        setOpen={setOpenDelete}
        contactId={openDelete.id}
        rows={rows}
        setRows={setRows}
        headers={headers}
        setAll={setAll}
      />
    </Layout>
  );
}
