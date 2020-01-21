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
  FormLabel,
  Grid
} from "@material-ui/core";
import WorkIcon from "@material-ui/icons/Work";
import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default function AddGroupModal({
  openGroupModal,
  handleCloseGroup,
  editGroup,
  setSelectedGroup,
  selectedGroup,
  chooseIcon,
  userId
}) {
  const [errorMsgGroupName, setErrorMsgGroupName] = useState("");

  let history = useHistory();
  const handleSaveGroup = () => {
    if (selectedGroup.groupname !== "") {
      setErrorMsgGroupName("");
      editGroup
        ? axios
            .patch(`http://localhost:3004/group/${selectedGroup.id}`, {
              groupname: selectedGroup.groupname,
              icon: selectedGroup.icon
            })
            .then(() => {
              handleCloseGroup();
              Swal.fire({
                title: "Group Name Successfully Edited",
                icon: "success"
              }).then(() => history.push("/addressbook"));
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
              groupname: selectedGroup.groupname,
              icon: selectedGroup.icon
            })
            .then(() => {
              handleCloseGroup();
              Swal.fire({
                title: "Group Added Successfully",
                icon: "success"
              }).then(() => history.push("/addressbook"));
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
          defaultValue={editGroup ? selectedGroup.groupname : ""}
          autoFocus
          margin="dense"
          id="name"
          label="Group Name"
          type="text"
          fullWidth
          onChange={e =>
            setSelectedGroup({ ...selectedGroup, groupname: e.target.value })
          }
        />
        <FormControl component="fieldset" className={chooseIcon}>
          <FormLabel component="legend">
            Please choose an icon category
          </FormLabel>
          <RadioGroup
            aria-label="position"
            name="position"
            value={selectedGroup.icon}
            onChange={e =>
              setSelectedGroup({ ...selectedGroup, icon: e.target.value })
            }
            row
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  value="HomeIcon"
                  control={<Radio color="primary" />}
                  label={
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <HomeIcon style={{ fontSize: "2em", marginRight: 6 }} />
                      </Grid>
                      <Grid item>Home</Grid>
                    </Grid>
                  }
                  labelPlacement="end"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  value="WorkIcon"
                  control={<Radio color="primary" />}
                  label={
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <WorkIcon style={{ fontSize: "2em", marginRight: 6 }} />
                      </Grid>
                      <Grid item>Work</Grid>
                    </Grid>
                  }
                  labelPlacement="end"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  value="PersonIcon"
                  control={<Radio color="primary" />}
                  label={
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <PersonIcon
                          style={{ fontSize: "2em", marginRight: 6 }}
                        />
                      </Grid>
                      <Grid item>Personal</Grid>
                    </Grid>
                  }
                  labelPlacement="end"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  value="GroupIcon"
                  control={<Radio color="primary" />}
                  label={
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <GroupIcon
                          style={{ fontSize: "2em", marginRight: 6 }}
                        />
                      </Grid>
                      <Grid item>Acquintance</Grid>
                    </Grid>
                  }
                  labelPlacement="end"
                />
              </Grid>
            </Grid>
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
