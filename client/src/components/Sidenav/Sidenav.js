import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { MDBBtn, MDBIcon } from "mdbreact";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Routes from "./routes";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    backgroundColor: "#1773e8",
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
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const {
    changeHandler,
    selectHandler,
    createContactHandler,
    editContactHandler,
    handleLogout,
    isLoading,
    handleModalOpen,
    handleModalClose,
    isModal,
    currentData,
    deleteContactHandler,
    deleteContact,
    groups,
    search,
    groupData,
    viewContact,
    contact,
    addToGroup,
    addToGroupHandler,
    addAGroup,
    addAGroupHandler,
    editGroup,
    editGroupHandler,
    deleteGroup,
    deleteGroupHandler,
    editContact
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openGroup, setOpenGroup] = React.useState(true);

  const handleClick = () => {
    setOpenGroup(!openGroup);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignContent="center"
          flexWrap="wrap"
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
            marginLeft: "20px",
            marginRight: "20px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            <Avatar style={{ height: "80px", width: "80px" }} />
          </div>
          <div
            style={{
              paddingTop: "15px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            <Typography align={"center"}>
              {props.pName ? props.pName : ""}
            </Typography>
          </div>
        </Box>
      </div>
      <Divider />
      <div style={{ padding: "10px" }}>
        <MDBBtn
          color="info"
          outline
          style={{ borderRadius: "20px" }}
          onClick={() => handleModalOpen(groupData, "addContact")}
        >
          <MDBIcon icon="plus" className="mr-1" /> Create Contact
        </MDBBtn>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          key={"All Contacts"}
          onClick={() => props.fetchContact(2)}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={"All Contacts"} />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Groups" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openGroup} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              <Button
                variant="outlined"
                onClick={() => handleModalOpen([], "addAGroup")}
              >
                <AddIcon />
                Add a Group
              </Button>
            </ListItem>
            {groups
              ? groups.map(e => (
                  <ListItem
                    button
                    key={e.id}
                    className={classes.nested}
                    onClick={() => props.fetchContact(e)}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={e.group_name} />
                  </ListItem>
                ))
              : ""}
          </List>
        </Collapse>
        <Divider />
        <ListItem button key={"logout"} onClick={handleLogout}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
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
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar}></div>
        <Routes
          createContactHandler={createContactHandler}
          editContactHandler={editContactHandler}
          deleteContactHandler={deleteContactHandler}
          changeHandler={changeHandler}
          selectHandler={selectHandler}
          isLoading={isLoading}
          handleModalClose={handleModalClose}
          handleModalOpen={handleModalOpen}
          isModal={isModal}
          currentData={currentData}
          deleteContact={deleteContact}
          contact={contact}
          addToGroup={addToGroup}
          addToGroupHandler={addToGroupHandler}
          addAGroup={addAGroup}
          editContact={editContact}
          addAGroupHandler={addAGroupHandler}
          editGroup={editGroup}
          editGroupHandler={editGroupHandler}
          deleteGroup={deleteGroup}
          deleteGroupHandler={deleteGroupHandler}
          groups={groups}
          search={search}
          viewContact={viewContact}
          groupData={groupData}
        />
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};

export default ResponsiveDrawer;
