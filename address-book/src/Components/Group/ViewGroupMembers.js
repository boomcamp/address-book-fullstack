import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default function Edit({
  openViewMem,
  handleCloseGroupModal,
  rowData,
  groupmembers
}) {
  let history = useHistory();

  const handleDeleteGroupMem = members => {
    Swal.fire({
      title: `Are you sure you want to delete from your group contacts?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        axios({
          method: "delete",
          url: `http://localhost:3004/deletegroupmembers/${members.id}`
        })
          .then(() => {
            Swal.fire({
              title: "Group Contact Deleted  Successfully",
              icon: "success"
            }).then(() => {
              handleCloseGroupModal();
              history.push("/addressbook");
            });
          })
          .catch(err => {
            Swal.fire({
              icon: "error",
              title: "Failed to Delete Group Contact",
              text: err
            });
          });
      }
    });
  };

  return (
    <Dialog
      open={openViewMem}
      onClose={handleCloseGroupModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {rowData.groupname} Group Members
      </DialogTitle>
      <DialogContent>
        <Grid item xs={12} md={12}>
          {groupmembers.map((members, key) => {
            return (
              <List key={key}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ContactPhoneIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={members.firstname + " " + members.lastname}
                  />

                  <ListItemSecondaryAction>
                    <Tooltip title="Delete Member">
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteGroupMem(members)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            );
          })}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
