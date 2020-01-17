import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
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

export default function GroupedContact({ headers, match }) {
  const classes = useStyles();
  const [groups, setGroups] = useState([]);

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
        <InputLabel htmlFor="grouped-select">Group by</InputLabel>
        <Select defaultValue="" input={<Input id="grouped-select" />}>
          <MenuItem value="all">
            <em>All Contacts</em>
          </MenuItem>
          {groups.map((group, i) => (
            <MenuItem value={i} key={i}>
              {group.groupname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
