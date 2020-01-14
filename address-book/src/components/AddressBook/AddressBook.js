import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import ListIcon from '@material-ui/icons/List';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import { Typography } from '@material-ui/core';
// import Settings from './Settings';
// import AddressBook from './AddressBook';
import UserDetails from './UserDetails';
import Groups from './Groups';
import Contacts from './Contacts';

export default function UserManage() {
    var [token, emptyToken] = useState(false) // for what?
    const [page, setPage] = useState('contacts')
    const [toggle, setToggle] = useState({left:false})
    // const [open1, setOpen1] = useState(false);
    
    
    useEffect(() => {
        
    },[])

    const logout = () =>{
        localStorage.clear();
        emptyToken(true);
    }
    if(token){
        return(<Redirect to="/login"/>)
    }
    if(!localStorage.getItem('token')){
        return(<Redirect to="/login"/>)
    }
    const openDetails = () => {
        setPage('details')
    };
    const openContacts = () => {
        setPage('contacts')
    }
    const openGroups = () => {
        setPage('groups')
    }
    // const addContact = () => {
    //     setOpen1(true)
    // }
    const toggleDrawer = (side, open) => event => {
        setToggle({ ...toggle, [side]: open });
    };
    const sideList = side => (
        <div
            style={{width:'auto'}}
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <Button>
                <ListItem onClick={openDetails}>
                    <ListIcon title="User Details" fontSize="small" variant="outlined" color="primary"  style={{cursor: 'pointer'}}/>
                    <ListItemText> User Details </ListItemText>
                </ListItem>
                </Button>
            </List>
            <Divider />
            <List>
                <Button>
                <ListItem onClick={openContacts}>
                    <ListIcon title="User Details" fontSize="small" variant="outlined" color="primary" style={{cursor: 'pointer'}}/>
                    <ListItemText> Contacts </ListItemText>
                </ListItem>
                </Button>
            </List>
            <List>
                <Button>
                <ListItem onClick={openGroups}>
                    <GroupIcon title="Add Contacts" fontSize="small" variant="outlined" color="primary" style={{cursor: 'pointer'}}/>
                    <ListItemText> Add Groups </ListItemText>
                </ListItem>
                </Button>
            </List>
        </div>
    );
    return (
        <React.Fragment>
            <AppBar position="static" color="default" elevation={0}>
                <Toolbar>
                    <Button onClick={toggleDrawer('left', true)}><MenuIcon/></Button>
                    <Drawer open={toggle.left} onClose={toggleDrawer('left', false)}>
                        {sideList('left')}
                    </Drawer>
                    <Typography style={{flexGrow: "1"}}>
                        Address Book
                    </Typography>
                    <Button title="Logout User" size="small" variant="outlined" color="primary" onClick={logout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            {page === 'details' ? (
                <UserDetails/>
            ) : page === 'groups' ? (
                <Groups/>
            ) : page === 'contacts' ? (
                <Contacts/>
            ) : null
            }
        </React.Fragment>
    );
}