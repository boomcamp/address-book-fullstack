import React from "react";
import "./selectsort.css";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

export default function SelectSort(highprops) {
  const classes = useStyles();

  const selectSort = e => {
    axios({
      method: "get",
      url: highprops.setGroupRef
        ? `http://localhost:5000/api/contacts/groups/${sessionStorage.getItem(
            "userid"
          )}/ ${highprops.setGroupRef}?order=${e.target.value}`
        : `http://localhost:5000/api/contacts/groups/${sessionStorage.getItem(
            "userid"
          )}/sort/${e.target.value}/${highprops.setGroupRef}`
    })
      .then(data => {
        console.log(data);
        highprops.setTableData(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="select-sort-container">
        <select className={classes.SelectSortContainer} onChange={selectSort}>
          <option value="0" default>
            SORT LAST NAME BY
          </option>
          <option value="ASC">Ascendling</option>
          <option value="DESc">Descending</option>
        </select>
      </div>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  SelectSortContainer: {
    height: "25px",
    background: "rgb(241, 241, 241)",
    border: "1px solid rgb(214, 214, 214)",
    width: "150px",
    padding: "5px",
    position: "relative",
    float: "right",
    color: "rgb(34, 34, 34)",
    marginRight: "38px",
    marginTop: "20px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
      position: "relative",
      top: "-48px",
      left: "39px"
    }
  }
}));
