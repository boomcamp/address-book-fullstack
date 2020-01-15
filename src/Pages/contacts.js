import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Delete from "@material-ui/icons/Delete";
import Axios from "axios";
import * as ls from "local-storage";
import Layout from "../Layout/layout";
import EditContactModal from "../Modal/editContact";
import DeleteContactModal from "../Modal/deleteContact";

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
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState([]);
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

  // const sortTable = e => {
  //   setSort(e.target.value);
  //   Axios.get(
  //     `http://localhost:3001/contacts/list/${match.params.id}?sort=${e.target.value}`,
  //     headers
  //   );
  // };

  if (!auth) {
    history.push("/");
  } else {
    if (!stat) {
      Axios.get(
        `http://localhost:3001/contacts/list/${match.params.id}`,
        headers
      ).then(res => {
        setRows(res.data);
        setFilter(res.data);
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
    >
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Firstname</StyledTableCell>
              <StyledTableCell align="center">Lastname</StyledTableCell>
              <StyledTableCell align="center">Phone Number</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleOpen();
                    setGetContact(row);
                  }}
                >
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
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setOpenDelete({ status: true, id: row.id });
                  }}
                >
                  <Delete />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
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
      />
    </Layout>
  );
}
