import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Link from './IconList';
import Contact from './Contacts/Contact';
import Group from './Groups/Group';
import Logout from './Logout';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

export default function HomePage(props) {
	const token = JSON.parse(localStorage.getItem('token'));
	const { container } = props;
	const classes = useStyles();
	const theme = useTheme();

	const [page, setPage] = useState('');
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			props.history.push('/');
		}

		if (localStorage.getItem('notif')) {
			setOpen(true);
			localStorage.removeItem('notif');
		}

		axios
			.get('/api/users', { headers: { Authorization: `Bearer ${token}` } })
			.then(res => {
				console.log(res.data);
			})
			.catch(err => console.log(err));
	}, [token, props.history]);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<Link setPage={setPage} />
		</div>
	);

	//Notificaton
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<div className={classes.root}>
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
						<Typography variant="h6" noWrap className={classes.title}>
							Address Book
						</Typography>

						<Logout />
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer} aria-label="mailbox folders">
					<Hidden smUp implementation="css">
						<Drawer
							container={container}
							variant="temporary"
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
					<div className={classes.toolbar} />
					{page === 'contact' ? (
						<Contact />
					) : page === 'group' ? (
						<Group />
					) : null}
				</main>
			</div>

			<Snackbar
				open={open}
				autoHideDuration={1000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert onClose={handleClose} severity="success">
					Successfully logged in.
				</Alert>
			</Snackbar>
		</React.Fragment>
	);
}

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	title: {
		flexGrow: 1
	}
}));
