import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import GroupPhoto from "../images/group.svg";
import WorkIcon from "@material-ui/icons/Work";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddGroupModal from "./AddGroupModal";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default function GroupCard({ willEdit, userId }) {
  const classes = useStyles();
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [editGroup, setEditGroup] = useState(false);
  const handleClickOpenGroup = () => setOpenGroupModal(true);
  const handleCloseGroup = () => {
    setEditGroup(false);
    setOpenGroupModal(false);
  };
  const [groupLs, setGroupLs] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState(0);
  let history = useHistory();
  useEffect(() => {
    async function result() {
      await axios
        .get(`http://localhost:3004/group/${userId}`)
        .then(res => {
          setGroupLs(res.data);
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Failed to Retrieve Group List",
            text: err
          });
        });
    }
    result();
  }, [userId, groupLs]);

  const handleEditGroup = groupData => {
    setGroupName(groupData.groupname);
    setGroupId(groupData.id);
    setEditGroup(true);
    handleClickOpenGroup();
  };
  const handleDeleteGroup = groupData => {
    Swal.fire({
      title: `Are you sure you want to delete ${groupData.groupname} from your group list?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        axios
          .delete(`http://localhost:3004/group/${groupData.id}`)
          .then(() => {
            Swal.fire({
              title: "Group Successfully Deleted",
              icon: "success"
            }).then(() => history.push("/addressbook"));
          })
          .catch(err => {
            Swal.fire({
              icon: "error",
              title: "Failed to Delete Group",
              text: err
            });
          });
      }
    });
  };
  return (
    <React.Fragment>
      <AddGroupModal
        openGroupModal={openGroupModal}
        handleCloseGroup={handleCloseGroup}
        editGroup={editGroup}
        groupName={groupName}
        setGroupName={setGroupName}
        groupId={groupId}
        chooseIcon={classes.chooseIcon}
        willEdit={willEdit}
        userId={userId}
      />
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={GroupPhoto}
          title="Community"
        />
        <CardContent className={classes.content}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Group List
              </ListSubheader>
            }
            className={classes.root}
          >
            {groupLs
              ? groupLs.map((data, key) => {
                  return (
                    <ListItem key={key} button>
                      <ListItemIcon>
                        <WorkIcon />
                      </ListItemIcon>
                      <ListItemText primary={data.groupname} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleEditGroup(data)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteGroup(data)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })
              : null}
          </List>
          <CardActions className={classes.cardAction}>
            <Button
              size="small"
              color="primary"
              onClick={() => handleClickOpenGroup()}
            >
              Add Group
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: "5%!important",
    display: "flex",
    marginBottom: "2.5%!important",
    minHeight: "300px",
    maxHeight: "300px",
    width: "100%!important",
    padding: "0!important"
  },
  content: {
    width: "40%!important",
    padding: "0!important",
    overflowY: "auto"
  },
  cover: {
    width: "60%!important",
    backgroundSize: "contain",
    backgroundColor: "rgba(0, 128, 128, 0.75)"
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  cardAction: {
    justifyContent: "flex-end"
  },
  chooseIcon: {
    marginTop: "10px"
  }
}));
