import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function GroupedContact({
  headers,
  match,
  setRows,
  all,
  groups,
  setGroups
}) {
  const classes = useStyles();
  const [state, setState] = useState("");

  const groupList = e => {
    setState(e.target.value);
    if (e.target.value === "all") {
      setRows(all);
    } else {
      axios
        .get(
          `http://localhost:3001/contacts/group/list/${match.params.id}/${e.target.value}`,
          headers
        )
        .then(res => setRows(res.data));
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/group/list/${match.params.id}`, headers)
      .then(res => {
        setGroups(res.data.groups);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="grouped-select">Group by</InputLabel>
        <Select
          labelId="grouped-select"
          id="select"
          value={state}
          onChange={groupList}
        >
          <MenuItem value="all">
            <em>All Contacts</em>
          </MenuItem>
          {groups.map((group, i) => (
            <MenuItem value={group.id} key={i}>
              {group.groupname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
