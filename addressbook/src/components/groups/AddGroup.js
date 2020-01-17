import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";

export const AddGroup = props => {
  const { dialog, setDialog, handleAddGroup, setGroupDetails } = props;
  return (
    <Dialog open={dialog} onClose={() => setDialog(false)}>
      <form onSubmit={e => handleAddGroup(e)}>
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent>
          <TextField
            onChange={e => setGroupDetails({ [e.target.name]: e.target.value })}
            name="group_name"
            type="group_name"
            label="Group Name"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)} color="primary">
            Close
          </Button>
          <Button type="submit" color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
