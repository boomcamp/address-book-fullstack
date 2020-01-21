import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import { withSnackbar } from 'notistack';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

// COMPONENTS
import TopBar from './TopBar'
import SideBar from './SideBar'


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
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
}));

function TemplateMainPage({enqueueSnackbar, children}) {
    const classes = useStyles();
    const [open, setOpen] = useState((window.innerWidth<800)?false:true);

    useEffect( () => {
        // if(sessionStorage.getItem('token'))
        //     enqueueSnackbar('Welcome User!', {autoHideDuration: 2000,})
        window.addEventListener("resize", handleResize);

        return () => {window.addEventListener("resize", null); };
    }, [])
    
    const handleResize = (WindowSize, event) => {
        if(window.innerWidth<800)
            setOpen(false)
        else    
            setOpen(true)
    }

    if(!sessionStorage.getItem('token'))
        return <Redirect to='/'/>
        
    return (
        <div className={classes.root}>
            <TopBar handleOpenfn={() => setOpen(true)} open={open} />
            <SideBar handleOpenfn={() => setOpen(false)} open={open} />
            
            <main
                className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                <div className={classes.drawerHeader} />
                {children}
            </main>
        </div>
    );
}

export default withSnackbar(TemplateMainPage);