import React, { useEffect, useState } from "react";
import { Checkbox, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddToGroupList({ setIds, ids, userId }) {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    async function result() {
      await axios
        .get(`http://localhost:3004/group/${userId}`)
        .then(res => setGroups(res.data))
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Failed to Retrieve Groups",
            text: err
          });
        });
    }
    result();
  }, [userId, groups]);
  return (
    <Autocomplete
      multiple
      options={groups}
      getOptionLabel={groups ? option => option.groupname : false}
      value={ids
        .map(data => groups.findIndex(x => x.id === data.id))
        .filter(item => item >= 0)
        .map(num => groups[num])}
      disableCloseOnSelect
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.groupname}
        </React.Fragment>
      )}
      onChange={(e, n) => setIds(n)}
      renderInput={params => (
        <TextField
          {...params}
          variant="standard"
          label="Choose one or more Group List"
          placeholder="Group List"
          fullWidth
        />
      )}
    />
  );
}
