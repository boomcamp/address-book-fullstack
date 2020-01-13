import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Axios from "axios";
import * as ls from "local-storage";
import Layout from "../Layout/layout";

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

export default function Contacts(props) {
  const classes = useStyles();
  const [stat, setStat] = useState(false);
  const [rows, setRows] = useState([]);
  const auth = ls.get("auth");

  useEffect(() => {
    if (!auth.token) {
      props.history.push("/");
    } else {
      if (!stat) {
        Axios.get(`http://localhost:3001/contacts/list/${auth.id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        }).then(res => setRows(res.data));
        setStat(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout history={props.history}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Firstname</StyledTableCell>
              <StyledTableCell align="right">Lastname</StyledTableCell>
              <StyledTableCell align="right">Phonenumber</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.first_name}>
                <StyledTableCell component="th" scope="row">
                  {row.first_name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.last_name}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.mobile_phone}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
