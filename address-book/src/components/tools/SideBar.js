import React from 'react'
import {Link} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

// ICONS
import ContactsIcon from '@material-ui/icons/Contacts';
// import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: `rgba(186, 196, 200, 0.65)`,
        // color: `white`
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}));

export default function SideBar({handleOpenfn, open}) {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}>

            <div className={classes.drawerHeader}>
                <IconButton onClick={handleOpenfn}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>

            <Divider />

            <List>
                <Link to="/dashboard" style={{textDecoration:`none`, color:`black`}}> 
                    <ListItem button>
                        <ListItemIcon><ContactsIcon /></ListItemIcon>
                        <ListItemText primary="Contacts" />
                    </ListItem>
                </Link>

                <Link to="/group" style={{textDecoration:`none`, color:`black`}} > 
                <ListItem button>
                            <ListItemIcon ><GroupIcon /></ListItemIcon>
                            <ListItemText primary="Group Contacts" />
                    </ListItem>
                </Link>

                <Link to="/account" style={{textDecoration:`none`, color:`black`}} > 
                <ListItem button>
                            <ListItemIcon ><AccountCircleIcon /></ListItemIcon>
                            <ListItemText primary="My Account" />
                    </ListItem>
                </Link>

                <Divider />

                <ListItem button onClick={() => { sessionStorage.clear(); window.location.reload(); }}>
                    <ListItemIcon style={{ color: `red` }}><ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Drawer>
    )
}
