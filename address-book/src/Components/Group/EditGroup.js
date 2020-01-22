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

export default function Edit({
  openGroupEdit,
  handleCloseGroupModal,
  rowData
}) {
  let history = useHistory();
  const [groupname, setGroupname] = useState("");
  const tokenDecoded = jwt.decode(localStorage.getItem("Token"));
  const loadValue = React.useContext(LoadContext);

  const handleSaveGroup = () => {
    axios
      .patch(`http://localhost:3004/groupcontacts/${rowData.id}`, {
        userid: tokenDecoded.userId,
        groupname: groupname
      })
      .then(res => {
        handleCloseGroupModal();
        Swal.fire({
          title: "Group Contact Edited Successfully",
          icon: "success"
        }).then(() => {
          history.push("/addressbook");
        });
      })
      .then(() => loadValue.setLoad(true))
      .catch(e => {
        Swal.fire({
          icon: "error",
          title: "Failed to Edit Group Contact",
          text: e
        });
      });
  };

  return (
    <Dialog
      open={openGroupEdit}
      onClose={handleCloseGroupModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Group Contact</DialogTitle>
      <DialogContent>
        <TextField
          defaultValue={rowData.groupname}
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
          onClick={() => handleSaveGroup()}
          variant="contained"
          color="primary"
          size="small"
        >
          Save Group
        </Button>
      </DialogActions>
    </Dialog>
  );
}
