import React from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import swal from "sweetalert";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import sort from "../assets/images/swap.png";
import ablogo from "../assets/images/address-book.png";
import Table from "./Table";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		textAlign: "left",
		display: "flex",
		"@media (max-width: 768px)": {
			display: "none"
		}
	},
	nameColor: {
		color: "pink",
		cursor: "default",
		fontWeight: "bold"
	},
	buttons: {
		"@media (max-width: 768px)": {
			position: "absolute",
			right: "10px"
		}
	},
	headColor: {
		background: "#7c7cca"
	},
	abLogo: {
		width: "30px"
	},
	compress: {
		display: "flex"
	},
	paper: {
		width: "auto",
		height: "auto",
		background: "#a4beeb",
		marginTop: "5vh",
		"@media (max-width: 767px)": {
			marginTop: "5vh",
			marginBottom: "-3vh"
		}
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.3),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginLeft: 0,
		width: "auto",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(0),
			width: "auto"
		}
	},
	searchIcon: {
		width: theme.spacing(7),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "#7c7cca"
	},
	inputRoot: {
		color: "inherit"
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: 120,
			"&:focus": {
				width: 400
			}
		}
	},
	div: {
		background: "white",
		width: "97%",
		height: "50vh",
		overflow: "auto",
		"&::-webkit-scrollbar-track": {
			webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
			backgroundColor: "#F5F5F5",
			borderRadius: "10px"
		},
		"&::-webkit-scrollbar": {
			backgroundColor: "#F5F5F5",
			width: "10px"
		},
		"&::-webkit-scrollbar-thumb": {
			backgroundColor: "#7c7cca"
		},
		"@media (max-width: 767px)": {
			width: "100%"
		}
	},
	contacts: {
		fontWeight: "bold",
		fontSize: "22px",
		marginTop: "5vh",
		marginBottom: "3px",
		color: "white",
		background: "#a4beeb",
		width: "97%",
		"@media (max-width: 767px)": {
			width: "auto",
			fontSize: "18px"
		}
	}
}));

export default function ButtonAppBar() {
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	let userInfo = JSON.parse(localStorage.getItem("user"));

	if (!localStorage.getItem("Token")) {
		swal({
			icon: "error",
			title: "You must login first"
		}).then(function() {
			window.location = "/";
		});
	}

	const classes = useStyles();

	const logout = () => {
		swal({
			title: "Logged Out Successfully!",
			icon: "success",
			button: true
		}).then(function() {
			window.location = "/";
			localStorage.clear();
		});
	};

	if (!localStorage.getItem("Token")) {
		return null;
	} else {
		return (
			<div className={classes.root}>
				<AppBar position="static" className={classes.headColor}>
					<Toolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="menu"
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							<span style={{ marginRight: "10px" }}>
								Welcome to Address Book!
							</span>
							<img src={ablogo} alt="addressbook" className={classes.abLogo} />
						</Typography>

						<div className={classes.buttons}>
							<Button className={classes.nameColor}>
								<span style={{ paddingRight: "5px" }}>
									{userInfo.firstname}
								</span>
								{userInfo.lastname}
							</Button>
							<Button color="inherit" className={classes.but} onClick={logout}>
								Logout
							</Button>
						</div>
					</Toolbar>
				</AppBar>

				<Container maxWidth="xl">
					<Grid container xs={12}>
						<Grid item sm={3} xs={12}>
							<Container>
								<Paper className={classes.paper}>
									<div className={classes.search}>
										<div className={classes.searchIcon}>
											<SearchIcon />
										</div>
										<InputBase
											placeholder="Search…"
											classes={{
												root: classes.inputRoot,
												input: classes.inputInput
											}}
											inputProps={{ "aria-label": "search" }}
										/>
									</div>
									<ListItem button onClick={handleClick}>
										<ListItemIcon>
											<img
												src={sort}
												alt="sort"
												style={{
													width: "25px",
													marginRight: "5px"
												}}
											/>
										</ListItemIcon>
										<ListItemText primary="Sort (by Lastname)" />
										{open ? <ExpandLess /> : <ExpandMore />}
									</ListItem>
									<Collapse in={open} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											<ListItem button>
												<ListItemIcon>
													<ArrowUpwardIcon />
												</ListItemIcon>
												<ListItemText primary="Ascending" />
											</ListItem>
											<ListItem button>
												<ListItemIcon>
													<ArrowDownwardIcon />
												</ListItemIcon>
												<ListItemText primary="Descending" />
											</ListItem>
										</List>
									</Collapse>
								</Paper>
							</Container>
						</Grid>
						<Grid item sm={9} xs={12}>
							<Typography className={classes.contacts}>Contact List</Typography>
							<div className={classes.div}>
								<Table />
							</div>
						</Grid>
					</Grid>
				</Container>
			</div>
		);
	}
}
