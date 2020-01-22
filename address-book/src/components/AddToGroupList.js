import React from "react";
import { Checkbox, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

export default function AddToGroupList({ setIds, ids, groupLs }) {
  return (
    <Autocomplete
      multiple
      options={groupLs}
      getOptionLabel={groupLs ? option => option.groupname : false}
      value={ids
        .map(data => groupLs.findIndex(x => x.id === data.id))
        .filter(item => item >= 0)
        .map(num => groupLs[num])}
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
