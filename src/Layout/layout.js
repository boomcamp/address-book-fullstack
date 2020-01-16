import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import * as ls from "local-storage";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Your Website {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
      display: "flex"
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    position: "fixed",
    bottom: 0
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState({ contact: false, group: false });
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleOpen = () => {
    setOpen({ ...open, contact: true });
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleOpenGroup = () => {
    setOpen({ ...open, group: true });
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
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
      <MenuItem onClick={handleOpen}>Add Contact</MenuItem>
      <MenuItem onClick={handleOpenGroup}>Add Group</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
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
      <MenuItem onClick={handleProfileMenuOpen}>
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
              edge="start"
              className={classes.icon}
              color="inherit"
              title="Welcome to Mobile Legends"
              aria-label="account"
            >
              <AccountCircleIcon />
            </Tooltip>
            <Typography className={classes.title} variant="h6" noWrap>
              Welcome {props.user.firstname} {props.user.lastname}
            </Typography>
            <Search
              rows={props.rows}
              setRows={props.setRows}
              filter={props.filter}
            />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Tooltip title="Add" aria-label="addcontact">
                <AddCircleIcon
                  className={classes.icon}
                  edge="end"
                  aria-label="add"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                />
              </Tooltip>
              <Link to="/">
                <Tooltip title="Log Out" aria-label="logout">
                  <LogOut
                    onClick={() => {
                      ls.clear();
                    }}
                    color="inherit"
                    className={classes.icon}
                  ></LogOut>
                </Tooltip>
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
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      <AddContactModal
        open={open.contact}
        setOpen={setOpen}
        headers={props.headers}
        match={props.match}
        setRows={props.setRows}
        rows={props.rows}
      />
      <AddGroupModal
        open={open.group}
        setOpen={setOpen}
        match={props.match}
        headers={props.headers}
      />
    </>
  );
}
