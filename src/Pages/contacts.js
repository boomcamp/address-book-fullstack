import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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

function createData(Firstname, Lastname, Phonenumber) {
  return { Firstname, Lastname, Phonenumber };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Eclair", 262, 16.0),
  createData("Cupcake", 305, 3.7),
  createData("Gingerbread", 356, 16.0)
];

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function Contacts(props) {
  const classes = useStyles();
  const [stat, setStat] = useState(false);

  if (!ls.get("token")) {
    props.history.push("/");
  } else {
    if (!stat) {
      Axios({
        method: "get",
        url: `http://localhost:3001/users`,
        headers: {
          Authorization: `Bearer ${ls.get("token")}`
        }
      });
      setStat(true);
    }
  }
  return (
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
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
