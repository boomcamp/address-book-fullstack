import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import GroupIcon from "@material-ui/icons/Group";
import ViewGroupMembers from "./ViewGroupMembers";
import AddGroupModal from "./AddGroupModal";
import EditGroup from "./EditGroup";
import { LoadContext } from "../AddressBook/addressBook";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  }
}));

export default function AddGroup() {
  const loadValue = React.useContext(LoadContext);
  let history = useHistory();
  const classes = useStyles();
  const [groupData, setGroupData] = useState([]);
  const [rowData, setRowData] = useState("");
  const [openGroupModal, setOpenGroupModal] = React.useState(false);
  const [openViewMem, setOpenViewMem] = React.useState(false);
  const [openGroupEdit, setOpenGroupEdit] = React.useState(false);
  const tokenDecoded = jwt.decode(localStorage.getItem("Token"));
  const [groupmembers, setGroupmembers] = useState([]);

  const handleClickOpenGroupModal = () => {
    setOpenGroupModal(true);
  };

  const handleClickOpenGroupEdit = data => {
    setRowData(data);
    setOpenGroupEdit(true);
  };

  const handleClickOpenViewMem = data => {
    axios({
      method: "get",
      url: `http://localhost:3004/getgroupmembers/${data.id}`
    }).then(res => {
      setRowData(data);
      setOpenViewMem(true);
      setGroupmembers(res.data);
    });
  };

  const handleCloseGroupModal = () => {
    setOpenGroupModal(false);
    setOpenGroupEdit(false);
    setOpenViewMem(false);
  };

  useEffect(() => {
    (async function result() {
      await axios({
        method: "get",
        url: `http://localhost:3004/groupcontacts/${tokenDecoded.userId}`
      }).then(res => {
        setGroupData(res.data);
      });
    })();
    loadValue.setLoad(false);
  }, [loadValue.load]);

  const handleDeleteGroup = data => {
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
              title: "Group Contact Deleted Successfully",
              icon: "success"
            }).then(() => {
              history.push("/addressbook");
            });
          })
          .then(() => loadValue.setLoad(true))
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
    <Grid container style={{ margin: "1% auto", width: "100%" }}>
      <Grid item sm={12} xs={12} md={12} lg={12}>
        <Card className={classes.card} variant="outlined">
          <Typography
            variant="h6"
            component="h2"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingLeft: "3%",
              paddingTop: "1%"
            }}
          >
            Group List
          </Typography>
          <CardContent
            style={{
              maxHeight: "200px",
              minHeight: "200px",
              overflowY: "scroll"
            }}
          >
            <Grid item xs={12} md={10}>
              <div className={classes.demo}>
                {groupData.map((data, key) => {
                  return (
                    <List key={key}>
                      <ListItem>
                        <ListItemAvatar key="avatar">
                          <Avatar>
                            <GroupIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={data.groupname} key="text" />
                        <ListItemSecondaryAction key="secondary action">
                          <Tooltip title="Delete Group">
                            <IconButton
                              onClick={() => handleDeleteGroup(data)}
                              edge="end"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Edit Group">
                            <IconButton
                              onClick={() => handleClickOpenGroupEdit(data)}
                              edge="end"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="View Members">
                            <IconButton
                              onClick={() => handleClickOpenViewMem(data)}
                              edge="end"
                            >
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

              <ViewGroupMembers
                groupmembers={groupmembers}
                rowData={rowData}
                openViewMem={openViewMem}
                handleCloseGroupModal={handleCloseGroupModal}
              />
            </Grid>
          </CardContent>
        </Card>
        <Button
          variant="contained"
          onClick={handleClickOpenGroupModal}
          style={{
            marginTop: "1%",
            backgroundColor: "#065786d9",
            color: "white"
          }}
        >
          Add Group
        </Button>
      </Grid>
    </Grid>
  );
}
