import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MenuItem } from "@material-ui/core";
import styled from "styled-components";
import { Select } from "@material-ui/core";
import { TextField } from "@material-ui/core";

const Box = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
const Item = styled.div`
  padding: 5px;
  width: 100%;
`;

export const AddGroup = props => {
  const { userData } = props.data;
  const { dialog, setDialog, handleAddGroup, setGroupDetails } = props;
  return (
    <Dialog open={dialog} onClose={() => setDialog(false)}>
      <form onSubmit={e => handleAddGroup(e)}>
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent>
          <TextField
            onChange={e => setGroupDetails({ [e.target.name]: e.target.value })}
            name="groupName"
            type="groupName"
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
