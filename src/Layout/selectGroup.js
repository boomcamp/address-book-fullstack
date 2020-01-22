import React, { useEffect } from "react";
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
  setGroups,
  setPage,
  getGroup,
  setGetGroup,
  setStatus
}) {
  const classes = useStyles();

  const groupList = e => {
    setGetGroup(e.target.value);

    if (e.target.value === "all") {
      setRows(all);
      setStatus(false);
    } else {
      axios
        .get(
          `http://localhost:3001/contacts/group/list/${match.params.id}/${e.target.value}`,
          headers
        )
        .then(res => {
          setPage(0);
          setStatus(true);
          setRows(res.data);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/group/list/${match.params.id}`, headers)
      .then(res => {
        setGroups(res.data);
      })
      .catch(error => {
        try {
          alert(error.response.data.error);
        } catch {
          console.log(error);
        }
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
          value={getGroup}
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
