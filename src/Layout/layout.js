import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import * as ls from "local-storage";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ContactsIcon from "@material-ui/icons/Contacts";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddContactModal from "../Modal/addContact";
import Search from "./search";
import AddGroupModal from "../Modal/addGroup";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },

  icon: {
    marginRight: theme.spacing(2)
  }
}));
const LogOut = styled(ExitToAppIcon)`
  path {
    color: white;
  }
`;

export default function Layout(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleOpen = () => {
    setContactOpen(true);
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleOpenGroup = () => {
    setGroupOpen(true);
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleAddMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };
  //mobile
  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const menuId = "add";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleOpen}>
        <IconButton aria-label="contact" aria-haspopup="true" color="inherit">
          <ContactsIcon />
        </IconButton>
        Add Contact
      </MenuItem>
      <MenuItem onClick={handleOpenGroup}>
        <IconButton aria-label="group" aria-haspopup="true" color="inherit">
          <GroupAddIcon />
        </IconButton>
        Add Group
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "add-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        className={classes.icon}
        edge="end"
        aria-label="add"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <IconButton aria-label="add" aria-haspopup="true" color="inherit">
          <AddCircleIcon />
        </IconButton>
        <p>Add</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          ls.clear();
          props.history.push("/");
        }}
      >
        <IconButton color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <p>Log Out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Tooltip
              className={classes.icon}
              color="inherit"
              title="My Profile"
              aria-label="account"
            >
              <AccountCircleIcon />
            </Tooltip>
            {props.auth ? (
              <Typography className={classes.title} variant="h6" noWrap>
                Welcome {props.user.firstname} {props.user.lastname}
              </Typography>
            ) : (
              props.history.push("/")
            )}
            <Search
              rows={props.rows}
              setRows={props.setRows}
              filter={props.filter}
            />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="account of current user"
                aria-controls={menuId}
                onClick={handleAddMenuOpen}
                color="inherit"
              >
                <AddCircleIcon />
              </IconButton>
              <Link to="/">
                <IconButton
                  color="inherit"
                  onClick={() => {
                    ls.clear();
                  }}
                >
                  <LogOut />
                </IconButton>
              </Link>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreVertIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <div>{props.children}</div>
        </Container>
      </main>

      <AddContactModal
        open={contactOpen}
        setOpen={setContactOpen}
        headers={props.headers}
        match={props.match}
        setRows={props.setRows}
        rows={props.rows}
        setAll={props.setAll}
        all={props.all}
      />
      <AddGroupModal
        open={groupOpen}
        setOpen={setGroupOpen}
        match={props.match}
        headers={props.headers}
        setGroups={props.setGroups}
        groups={props.groups}
      />
    </>
  );
}
