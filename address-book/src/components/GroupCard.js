import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import GroupPhoto from "../images/group.svg";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WorkIcon from "@material-ui/icons/Work";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import AddGroupModal from "./AddGroupModal";
import axios from "axios";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";

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

export default function GroupCard() {
  const classes = useStyles();
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [editGroup, setEditGroup] = useState(false);
  const handleClickOpenGroup = () => setOpenGroupModal(true);
  const handleCloseGroup = () => {
    setEditGroup(false);
    setOpenGroupModal(false);
  };
  const [groupList, setGroupList] = useState([]);
  const tokenDecoded = jwt.decode(localStorage.getItem("Token"));
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState(0);

  useEffect(() => {
    async function result() {
      await axios({
        method: "get",
        url: `http://localhost:3004/group/${tokenDecoded.userId}`
      })
        .then(res => {
          setGroupList(res.data);
        })
        .catch(err => console.log(err));
    }
    result();
  }, [tokenDecoded.userId]);

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
        axios({
          method: "delete",
          url: `http://localhost:3004/group/${groupData.id}`
        })
          .then(response => {
            Swal.fire({
              title: "Group Successfully Deleted",
              icon: "success"
            }).then(() => {
              window.location = "/addressbook";
            });
          })
          .catch(err => {
            console.log(err);
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
            {groupList
              ? groupList.map(data => {
                  return (
                    <ListItem button>
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
            {/* <Button size="small" color="primary">
            Share
          </Button> */}
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
