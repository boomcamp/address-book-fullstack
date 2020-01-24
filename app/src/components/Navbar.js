import React, { useEffect, useState } from 'react';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import Tooltip from '@material-ui/core/Tooltip';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import Contact from './AddressBookUsers/Contact';


export default function Navbar() {
    const classes = useStyles();
    const auth = React.useState(true);
    const [, setSearch] = React.useState('');
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [users, setUsers] = useState([]);
    const [searchData, setSearchData] = useState([])

    // Dialogs
    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const menuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const menuClose = () => {
        setAnchorEl(null);
    };
    // End Dialogs

    // In App Functions
    const logOut = () => {
        localStorage.clear();
        window.location.href = "/"
    }

    // fetch user_id from token
    const token = jwt_decode(localStorage.getItem('token'));
    const id = token.user_id

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:3001/api/contacts/${id}/contacts`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setUsers(res.data);
            })


            .catch(e => console.log(e))
    }, [id]);

    const sortFnameAZ = () => {
        axios({
            method: 'get',
            url: `/api/contacts/${id}/contact/fa-z`,
        })
            .then(res => {
                setUsers(res.data);
            })
            .catch(e => console.log(e))
    }

    const sortFnameZA = () => {
        axios({
            method: 'get',
            url: `/api/contacts/${id}/contact/fz-a`,
        })
            .then(res => {
                setUsers(res.data);
            })
            .catch(e => console.log(e))
    }

    const sortLnameAZ = () => {
        axios({
            method: 'get',
            url: `/api/contacts/${id}/contact/la-z`,
        })
            .then(res => {
                setUsers(res.data);
            })
            .catch(e => console.log(e))
    }

    const sortLnameZA = () => {
        axios({
            method: 'get',
            url: `/api/contacts/${id}/contact/lz-a`,
        })
            .then(res => {
                setUsers(res.data);
            })
            .catch(e => console.log(e))
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch({ [e.target.name]: e.target.value })
        const filteredSearch = users.filter(name =>
            name.fname.toLowerCase().indexOf(e.target.value) !==
            -1 ||
            name.lname.toLowerCase().indexOf(e.target.value) !== -1
        );
        return setSearchData(filteredSearch);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: openDrawer,
                })}
            >
                <Toolbar>
                    <div className={classes.width}>
                        <Tooltip title="Menu">
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, openDrawer && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="h6" className={classes.title}>
                            {`Welcome to your Address Book`}
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                id='name'
                                name='name'
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={handleSearch}
                            />
                        </div>
                        {auth && (
                            <div>
                                <Tooltip title="Sign Out">
                                    <IconButton
                                        onClick={logOut}
                                        color="inherit"
                                    >
                                        <ExitToAppIcon />
                                    </IconButton>
                                </Tooltip>

                            </div>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={openDrawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Profile', 'Contacts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ?
                                <PersonIcon /> :
                                <MailIcon />
                            }
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: openDrawer,
                })}
            >
                <div className={classes.drawerHeader} />
                <div className={classes.row}>
                    <Contact
                        handleClickOpen={handleClickOpen}
                        handleClose={handleClose}
                        open={open}
                        anchorEl={anchorEl}
                        menuOpen={menuOpen}
                        menuClose={menuClose}
                        sortFnameAZ={sortFnameAZ}
                        sortFnameZA={sortFnameZA}
                        sortLnameAZ={sortLnameAZ}
                        sortLnameZA={sortLnameZA}
                        users={users}
                        searchData={searchData}
                    />
                </div>
            </main>
        </div >
    );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        alignItems: 'center',
        margin: 10
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        marginTop: 7
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
        height: '100%',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center'
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    width: {
        display: "flex",
        width: 1366,
        margin: "auto"
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    }
}));