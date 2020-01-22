import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { LoadContext } from "../AddressBook/addressBook";

export default function AddGroupModal({
  openGroupModal,
  handleCloseGroupModal
}) {
  let history = useHistory();
  const loadValue = React.useContext(LoadContext);
  const [groupname, setGroupname] = useState("");
  const tokenDecoded = jwt.decode(localStorage.getItem("Token"));

  const handleAddGroup = () => {
    handleCloseGroupModal();
    axios
      .post(`http://localhost:3004/groupcontacts/`, {
        userid: `${tokenDecoded.userId}`,
        groupname: groupname
      })
      .then(res => {
        Swal.fire({
          title: "Group Contact Added Successfully",
          icon: "success"
        }).then(() => {
          history.push("/addressbook");
        });
      })
      .then(() => loadValue.setLoad())
      .catch(e => {
        Swal.fire({
          icon: "error",
          title: "Failed to Add Group Contact",
          text: e
        });
      });
  };

  return (
    <Dialog
      open={openGroupModal}
      onClose={handleCloseGroupModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Group Contact</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="groupname"
          label="Group Name"
          required
          fullWidth
          onChange={e => setGroupname(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseGroupModal}
          variant="contained"
          color="secondary"
          size="small"
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleAddGroup()}
          variant="contained"
          color="primary"
          size="small"
        >
          Add Group
        </Button>
      </DialogActions>
    </Dialog>
  );
}
