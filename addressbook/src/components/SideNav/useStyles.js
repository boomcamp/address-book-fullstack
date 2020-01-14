import React from "react";
import ExitToApp from "@material-ui/icons/ExitToApp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { NestedList } from "../groups/list";

const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100%"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 2,
    padding: theme.spacing(1)
  }
}));

export const DrawerCont = props => {
  const { setUser } = props.data;
  return (
    <div>
      <Divider />
      <NestedList data={props.data} />
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            setUser({});
            toast.info("Successfully logged out!", {
              position: toast.POSITION.TOP_CENTER
            });
          }}
        >
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </div>
  );
};
