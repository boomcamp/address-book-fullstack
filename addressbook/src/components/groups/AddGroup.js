import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";

export const AddGroup = props => {
  const { dialog, setDialog, handleAddGroup, setGroupDetails } = props;
  const { register, handleSubmit, errors } = useForm();
  return (
    <Dialog open={dialog} onClose={() => setDialog(false)}>
      <form onSubmit={handleSubmit(handleAddGroup)}>
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent>
          <TextField
            error={!!errors.group_name}
            onChange={e => setGroupDetails({ [e.target.name]: e.target.value })}
            name="group_name"
            type="group_name"
            label="Group Name"
            variant="outlined"
            fullWidth
            inputRef={register({
              required: "Group name is required"
            })}
            helperText={errors.group_name ? errors.group_name.message : ""}
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
