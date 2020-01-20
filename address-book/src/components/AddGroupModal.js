import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from "@material-ui/core";
import WorkIcon from "@material-ui/icons/Work";
import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddGroupModal({
  openGroupModal,
  handleCloseGroup,
  editGroup,
  groupName,
  setGroupName,
  groupId,
  chooseIcon,
  userId
}) {
  const [errorMsgGroupName, setErrorMsgGroupName] = useState("");
  const [value, setValue] = useState("female");
  const handleChange = event => {
    setValue(event.target.value);
  };
  const handleSaveGroup = () => {
    if (groupName !== "") {
      setErrorMsgGroupName("");
      editGroup
        ? axios
            .patch(`http://localhost:3004/group/${groupId}`, {
              groupname: groupName
            })
            .then(() => {
              handleCloseGroup();
              Swal.fire({
                title: "Group Name Successfully Edited",
                icon: "success"
              }).then(() => {
                window.location = "/addressbook";
              });
            })
            .catch(e => {
              Swal.fire({
                icon: "error",
                title: "Failed to Edit Group Name",
                text: e
              });
            })
        : axios
            .post(`http://localhost:3004/group/${userId}`, {
              groupname: groupName
            })
            .then(() => {
              handleCloseGroup();
              Swal.fire({
                title: "Group Added Successfully",
                icon: "success"
              }).then(() => {
                window.location = "/addressbook";
              });
            })
            .catch(e => {
              Swal.fire({
                icon: "error",
                title: "Failed to Add Group",
                text: e
              });
            });
    } else {
      setErrorMsgGroupName("This field is required!");
      Swal.fire({
        title: "Failed to add new group",
        text: "Group Name is required",
        icon: "error"
      });
    }
  };
  return (
    <Dialog
      open={openGroupModal}
      onClose={handleCloseGroup}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {editGroup ? "Edit Group" : "Add Group"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {editGroup
            ? "To edit the group name please change the group name below and select an icon for it."
            : "To add group to your contact list, please enter the name below and select an icon for it."}
        </DialogContentText>
        <TextField
          required
          error={errorMsgGroupName === "" ? false : true}
          helperText={errorMsgGroupName ? errorMsgGroupName : ""}
          defaultValue={editGroup ? groupName : ""}
          autoFocus
          margin="dense"
          id="name"
          label="Group Name"
          type="text"
          fullWidth
          onChange={e => setGroupName(e.target.value)}
        />
        <FormControl component="fieldset" className={chooseIcon}>
          <FormLabel component="legend">Please choose an icon</FormLabel>
          <RadioGroup
            aria-label="position"
            name="position"
            value={value}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="work"
              control={<Radio color="primary" />}
              label={<WorkIcon style={{ fontSize: "2em" }} />}
              labelPlacement="end"
            />
            <FormControlLabel
              value="home"
              control={<Radio color="primary" />}
              label={<HomeIcon style={{ fontSize: "2em" }} />}
              labelPlacement="end"
            />
            <FormControlLabel
              value="acquintance"
              control={<Radio color="primary" />}
              label={<GroupIcon style={{ fontSize: "2em" }} />}
              labelPlacement="end"
            />
            <FormControlLabel
              value="personal"
              control={<Radio color="primary" />}
              label={<PersonIcon />}
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseGroup} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleSaveGroup()} color="primary">
          {editGroup ? "Change Group Name" : "Add to Group"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
