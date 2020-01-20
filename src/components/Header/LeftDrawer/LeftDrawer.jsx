import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar } from '@material-ui/core';
import ContactsIcon from '@material-ui/icons/Contacts';
import GroupIcon from '@material-ui/icons/Group';

function LeftDrawer({ name, displayContacts, displayGroups }) {

  const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    avatarText: {
      margin: '10px auto',
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    listItem: {
      margin: '6px 0'
    }
  }));

  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenDrawer(open);
  };

  const nameAcronym = (val) => {
    if(val){
      const newName = val.split(' ');
      //return newName[0].substring(0,1).toUpperCase() + newName[newName.length-1].substring(0,1).toUpperCase();
      for(let index in newName){
        newName[index] = newName[index].charAt(0).toUpperCase() + newName[index].substring(1);  
      }
      return newName.join(' ');
    }
    return null;
  }

  const generator = () => {
    return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  }

  return (
    <React.Fragment>
      <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer anchor="left" open={openDrawer} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>
        <Avatar variant="rounded" style={{background: generator(), width: '95%'}} className={classes.avatarText}>{nameAcronym(name)}</Avatar>
        <Divider />
        <List className={classes.list} role="presentation" onKeyDown={toggleDrawer(false)}>
          <ListItem className={classes.listItem} button onClick={displayContacts}>
            <ListItemIcon><ContactsIcon /></ListItemIcon>
            <ListItemText primary="Contacts" />
          </ListItem>
          <Divider />
          <ListItem className={classes.listItem} button onClick={displayGroups}>
            <ListItemIcon><GroupIcon /></ListItemIcon>
            <ListItemText primary="Groups" />
          </ListItem>
          <Divider />
        </List>
      </SwipeableDrawer>
    </React.Fragment>
  )
}

export default LeftDrawer
