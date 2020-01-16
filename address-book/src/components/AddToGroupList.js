import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import jwt from "jsonwebtoken";

const useStyles = makeStyles(theme => ({
  formControl: {
    width: "100%"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default function AddToGroupList() {
  const tokenDecoded = jwt.decode(localStorage.getItem("Token"));
  const [groupList, setGroupList] = useState([]);
  const classes = useStyles();
  const [groups, setGroups] = useState([]);
  const handleChange = event => setGroups(event.target.value);

  useEffect(() => {
    async function result() {
      await axios({
        method: "get",
        url: `http://localhost:3004/group/${tokenDecoded.userId}`
      })
        .then(res => {
          //   console.log(res.data);
          setGroupList(res.data);
        })
        .catch(err => console.log(err));
    }
    result();
  }, [tokenDecoded.userId]);
  console.log(groups);
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-checkbox-label">Group List</InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        value={groups}
        onChange={handleChange}
        input={<Input />}
        renderValue={selected => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {groupList.map((data, key) => (
          <MenuItem key={key} value={data.groupname}>
            <Checkbox checked={groups.indexOf(data.groupname) > -1} />
            <ListItemText primary={data.groupname} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
