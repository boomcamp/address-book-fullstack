import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { AccountCircle, Group } from "@material-ui/icons";
import GroupAdd from "@material-ui/icons/GroupAdd";
import Contacts from "@material-ui/icons/Contacts";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Divider } from "@material-ui/core";
import { AddGroup } from "./AddGroup";
import { url } from "../../url";
import { toast } from "react-toastify";
import { getUserData, fetch } from "../customHooks/getUserData";
import Axios from "axios";

const AddButton = styled.div`
  border: 1px solid #5f6dbd;
  background: #3f51b5;
  border-radius: 5px;
  width: 90%;
  text-align: center;
  padding: 8px 0 0 0;
  font-size: 22px;
  color: white;
`;

const icons = {
  color: "#3f51b5"
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export const NestedList = props => {
  const {
    user,
    userData,
    handleFilterByGroup,
    group,
    setUserData,
    sort
  } = props.data;
  const groups = userData ? (userData.groups ? userData.groups : []) : [];
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [dialog, setDialog] = useState(false);
  const [groupDetails, setGroupDetails] = useState({});
  const handleClick = () => {
    setOpen(!open);
  };

  const handleAddGroup = async () => {
    try {
      const response = await Axios.post(
        `${url}/groups`,
        { ...groupDetails, date_created: Date.now(), user_id: user.id },
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );
      toast.info(response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      setDialog(false);

      if (!group) {
        return getUserData(user, sort).then(user => setUserData(user));
      }
      fetch(user, group, userData, setUserData, sort);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <React.Fragment>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <span
              style={{
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center"
              }}
            >
              <AccountCircle
                style={{
                  fontSize: "30px",
                  margin: "0 10px 0 0",
                  color: "#3f51b5"
                }}
              />
              Hello {user.first_name + " " + user.last_name}!
            </span>
          </ListSubheader>
        }
        className={classes.root}
      >
        <Divider />
        <Link to="/" style={link} onClick={() => handleFilterByGroup()}>
          <ListItem button>
            <ListItemIcon>
              <Contacts style={icons} />
            </ListItemIcon>
            <ListItemText primary="Contacts" />
          </ListItem>
        </Link>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <Group style={icons} />
          </ListItemIcon>
          <ListItemText primary="Groups" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding style={overFlow}>
            <React.Fragment>
              {groups.map(x => (
                <ListItem
                  button
                  className={classes.nested}
                  key={x.id}
                  onClick={() => handleFilterByGroup(x.id)}
                  style={group === x.id ? active : {}}
                >
                  <ListItemIcon>
                    <Group style={icons} />
                  </ListItemIcon>
                  <ListItemText primary={x.group_name} />
                </ListItem>
              ))}
            </React.Fragment>
            <ListItem
              button
              className={classes.nested}
              onClick={() => setDialog(true)}
            >
              <AddButton>
                <GroupAdd />
              </AddButton>
            </ListItem>
          </List>
        </Collapse>
      </List>
      <AddGroup
        dialog={dialog}
        setDialog={setDialog}
        handleAddGroup={handleAddGroup}
        setGroupDetails={setGroupDetails}
        groupDetails={groupDetails}
        data={props.data}
      />
    </React.Fragment>
  );
};

const link = { textDecoration: "none", color: "black" };
const active = { background: "#cccccc" };
const overFlow = { maxHeight: "288px", overflow: "auto" };
