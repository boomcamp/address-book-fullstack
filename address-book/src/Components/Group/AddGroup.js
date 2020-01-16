import React, { useState, useEffect } from "react";
import { Grid, Card, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Swal from "sweetalert2";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddGroupModal from "./AddGroupModal";
import Tooltip from "@material-ui/core/Tooltip";
import EditGroup from "./EditGroup";
import GroupIcon from "@material-ui/icons/Group";
import jwt from "jsonwebtoken";

const useStyles = makeStyles(theme => ({
  card1: {
    minWidth: 275
  },
  card2: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  pos: {
    marginBottom: 12
  },
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}));

export default function AddGroup({}) {
  const classes = useStyles();
  const [groupData, setGroupData] = useState([]);
  const [rowData, setRowData] = useState("");
  const [openGroupModal, setOpenGroupModal] = React.useState(false);
  const [openGroupEdit, setOpenGroupEdit] = React.useState(false);
  const tokenDecoded = jwt.decode(localStorage.getItem("Token"));

  const handleClickOpenGroupModal = () => {
    setOpenGroupModal(true);
  };

  const handleClickOpenGroupEdit = data => {
    setRowData(data);
    setOpenGroupEdit(true);
  };

  const handleCloseGroupModal = () => {
    setOpenGroupModal(false);
    setOpenGroupEdit(false);
  };

  useEffect(() => {
    async function result() {
      await axios({
        method: "get",
        url: `http://localhost:3004/groupcontacts/${tokenDecoded.userId}`
      }).then(res => {
        setGroupData(res.data);
      });
    }
    result();
  }, []);

  const handleDeleteGroup = data => {
    console.log(data);
    Swal.fire({
      title: `Are you sure you want to delete ${data.groupname} from your contacts?`,
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
          url: `http://localhost:3004/groupcontacts/${data.id}`
        })
          .then(() => {
            Swal.fire({
              title: "Group Contact Deleted  Successfully",
              icon: "success"
            }).then(() => {
              window.location = "/addressbook";
            });
          })
          .catch(err => {
            console.log(err);
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
    <Grid container spacing={2} style={{ margin: "0 auto", width: "100%" }}>
      <Grid item sm={12} xs={12} md={12} lg={12}>
        <Card className={classes.card2} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              Group List
            </Typography>
            <Grid item xs={12} md={10}>
              <div className={classes.demo}>
                {groupData.map(data => {
                  return (
                    <List>
                      <ListItem>
                        <ListItemAvatar key="avatar">
                          <Avatar>
                            <GroupIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={data.groupname} key="text" />
                        <ListItemSecondaryAction
                          key="secondary action"
                          style={{ margin: "0px" }}
                        >
                          <Tooltip title="Delete Group">
                            <IconButton>
                              <DeleteIcon
                                onClick={() => handleDeleteGroup(data)}
                              />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Edit Group">
                            <IconButton>
                              <EditIcon
                                onClick={() => handleClickOpenGroupEdit(data)}
                              />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="View Members">
                            <IconButton>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  );
                })}
              </div>
              <AddGroupModal
                openGroupModal={openGroupModal}
                handleCloseGroupModal={handleCloseGroupModal}
              />
              <EditGroup
                rowData={rowData}
                openGroupEdit={openGroupEdit}
                handleCloseGroupModal={handleCloseGroupModal}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpenGroupModal}
                style={{ marginTop: "2%" }}
              >
                Add Group
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
