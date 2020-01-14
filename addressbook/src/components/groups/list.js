import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Queue from "@material-ui/icons/Queue";
import Group from "@material-ui/icons/Group";
import GroupAdd from "@material-ui/icons/GroupAdd";
import Contacts from "@material-ui/icons/Contacts";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AddButton = styled.div`
  border: 1px solid black;
  background: none;
  border-radius: 5px;
  width: 90%;
  text-align: center;
  padding: 8px 0 0 0;
  font-size: 22px;
`;

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
  const { user } = props.data;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <span style={{ textTransform: "capitalize" }}>
            Hello {user.firstName + " " + user.lastName}!
          </span>
        </ListSubheader>
      }
      className={classes.root}
    >
      <Link to="/" style={link}>
        <ListItem button>
          <ListItemIcon>
            <Contacts />
          </ListItemIcon>
          <ListItemText primary="Contacts" />
        </ListItem>
      </Link>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Queue />
        </ListItemIcon>
        <ListItemText primary="Groups" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="#Alawinatics" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <AddButton>
              <GroupAdd />
            </AddButton>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};

const link = { textDecoration: "none", color: "black" };
