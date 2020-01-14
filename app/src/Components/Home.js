import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import swal from "sweetalert";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";

import ablogo from "../assets/images/address-book.png";
import Table from "./Table";
import Details from "./Details";
import AddContact from "./AddContact";
import SearchSort from "./SearchSort";

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
		width: "94%",
		"@media (max-width: 767px)": {
			fontSize: "18px",
			width: "90%"
		}
	},
	add: {
		width: "3%",
		background: "white",
		marginTop: "5vh",
		marginBottom: "3px",
		color: "white",
		"@media (max-width: 767px)": {
			width: "10%"
		}
	},
	addIcon: {
		color: "#7c7cca",
		marginTop: "5px",
		cursor: "pointer"
	}
}));

export default function ButtonAppBar() {
	const [openModal, setOpenModal] = React.useState(false);
	const [firstName, setFirstName] = useState("");

	const handleClickOpen = () => {
		setOpenModal(true);
	};

	const handleClose = firstName => {
		setOpenModal(false);
	};

	const handleChange = e => {
		setFirstName(e.target.value);
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
					<Grid container>
						<Grid item sm={3} xs={12}>
							<SearchSort />
						</Grid>
						<Grid item sm={9} xs={12}>
							<div style={{ display: "flex" }}>
								<Typography className={classes.contacts}>
									Contact List
								</Typography>
								<Typography className={classes.add}>
									<Tooltip title="Add New Contact">
										<AddIcon
											className={classes.addIcon}
											onClick={handleClickOpen}
										/>
									</Tooltip>
								</Typography>
							</div>
							<div className={classes.div}>
								<Table id={userInfo.id} />
							</div>
							<Details />
						</Grid>
					</Grid>
					<AddContact
						handleClose={handleClose}
						openModal={openModal}
						handleChange={handleChange}
						firstName={firstName}
					/>
				</Container>
			</div>
		);
	}
}
