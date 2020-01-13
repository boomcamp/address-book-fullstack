import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import StarBorder from "@material-ui/icons/StarBorder";
import Routes from "./routes";

import { useStyles } from "./Style";

class Sidenav extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleDrawerOpen = () => {
    this.setState({ toggle: true });
  };
  handleDrawerClose = () => {
    this.setState({ toggle: false });
  };

  handleClick = event => {
    this.setState({ menu: event.currentTarget });
  };

  handleGroup = () => {
    this.setState({ open: !this.state.open });
  };
  handleClose = () => {
    this.setState({ menu: null });
  };

  render() {
    const {
      classes,
      handleLogout,
      changeHandler,
      createContactHandler
    } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.toggle
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: this.state.toggle
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Address Book
            </Typography>
            <div style={{ marginLeft: "auto" }}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleClick}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.menu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(this.state.menu)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: this.state.toggle,
            [classes.drawerClose]: !this.state.toggle
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: this.state.toggle,
              [classes.drawerClose]: !this.state.toggle
            })
          }}
          open={this.state.toggle}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {classes.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {["Contacts", "Groups"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 ? (
                    <Link to={"/"} style={{ color: "grey" }}>
                      <PersonIcon />
                    </Link>
                  ) : index === 1 ? (
                    <Link to={"/groups"} style={{ color: "grey" }}>
                      <PeopleIcon />
                    </Link>
                  ) : (
                    ""
                  )}
                </ListItemIcon>
                {index === 0 ? (
                  <Link to={"/"} style={{ color: "grey" }}>
                    <ListItemText primary="Contacts" />
                  </Link>
                ) : (
                  <Link to={"/groups"} style={{ color: "grey" }}>
                    <ListItem button onClick={this.handleGroup}>
                      <ListItemText primary="Group" />
                      {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText primary="Starred" />
                        </ListItem>
                      </List>
                    </Collapse>
                  </Link>
                )}
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Routes
            createContactHandler={createContactHandler}
            changeHandler={changeHandler}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Sidenav);
