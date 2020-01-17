import React, { useState, useEffect } from "react";
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
import Paper from "@material-ui/core/Paper";
import ablogo from "../assets/images/address-book.png";
import Table from "./Table";
import Details from "./Details";
import AddContact from "./AddContact";
import SearchSort from "./SearchSort";
import axios from "axios";
import jwt from "jsonwebtoken";

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
		borderRadius: "5px",
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
			width: "100%",
			marginBottom: "5vh"
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
			width: "90%",
			marginTop: "0"
		}
	},
	add: {
		width: "3%",
		background: "white",
		marginTop: "5vh",
		marginBottom: "3px",
		color: "white",
		"@media (max-width: 767px)": {
			width: "10%",
			marginTop: "0"
		}
	},
	height: {
		height: "80vh"
	}
}));

export default function ButtonAppBar() {
	const classes = useStyles();

	let userInfo = JSON.parse(localStorage.getItem("user"));
	let display;

	const [setOpenModal] = useState(false);
	const [vDetails, setVDetails] = useState(false);
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [home_phone, setHomePhone] = useState("");
	const [mobile_phone, setMobilePhone] = useState("");
	const [work_phone, setWorkPhone] = useState("");
	const [email, setEmail] = useState("");
	const [city, setCity] = useState("");
	const [state_or_province, setStateOrProvince] = useState("");
	const [postal_code, setPostalCode] = useState("");
	const [country, setCountry] = useState("");

	const [contactId, setContactId] = useState("");
	const [whenClicked, setWhenClicked] = useState(false);
	const [order, setOrder] = useState("asc");
	const [state, setState] = useState([]);

	const tokenDecoded = jwt.decode(localStorage.getItem("Token"));

	if (!localStorage.getItem("Token")) {
		swal({
			icon: "error",
			title: "You must login first"
		}).then(function() {
			window.location = "/";
		});
	}

	const handleClose = () => {
		setOpenModal(false);
	};

	const handleCloseDetails = () => {
		setVDetails(false);
		setWhenClicked(false);
	};

	const handleSort = val => {
		setOrder(val);
		getData(tokenDecoded, order);
	};

	const handleSearch = v => {
		// setSearch(v);
		getData(tokenDecoded, order, v);
	};

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

	const handleViewDetails = e => {
		setContactId(e);
		axios({
			method: "get",
			url: `http://localhost:3006/contacts/${tokenDecoded.userId}/${e}`
		}).then(res => {
			const data = res.data[0];

			setFirstName(data.firstname);
			setLastName(data.lastname);
			setHomePhone(data.home_phone);
			setMobilePhone(data.mobile_phone);
			setWorkPhone(data.work_phone);
			setEmail(data.email);
			setCity(data.city);
			setStateOrProvince(data.state_or_province);
			setPostalCode(data.postal_code);
			setCountry(data.country);
		});
		setVDetails(true);
		setWhenClicked(true);
	};

	const handleShow = () => {
		handleViewDetails(contactId);
	};

	useEffect(() => {
		getData(tokenDecoded, order);
	}, [tokenDecoded.userId]);

	const getData = (tokenDecoded, order, search = "") => {
		axios
			.get(
				`http://localhost:3006/contacts/${tokenDecoded.userId}?order=${order}&search=${search}`
			)
			.then(res => {
				setState(res.data);
			});
	};

	if (vDetails) {
		display = (
			<Details
				firstname={firstname}
				lastname={lastname}
				home_phone={home_phone}
				mobile_phone={mobile_phone}
				work_phone={work_phone}
				email={email}
				city={city}
				state_or_province={state_or_province}
				postal_code={postal_code}
				country={country}
				handleCloseDetails={handleCloseDetails}
				contactId={contactId}
				handleShow={handleShow}
			/>
		);
	}

	if (localStorage.getItem("Token")) {
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
							<SearchSort
								userInfo={userInfo}
								handleSort={handleSort}
								handleSearch={handleSearch}
							/>
						</Grid>
						<Grid item sm={9} xs={12}>
							<div style={{ display: "flex" }}>
								<Typography className={classes.contacts}>
									Contact List
								</Typography>
								<Typography className={classes.add}>
									<AddContact handleClose={handleClose} id={userInfo.id} />
								</Typography>
							</div>
							<Paper
								className={classes.div}
								style={whenClicked ? { height: "50vh" } : { height: "80.5vh" }}
							>
								<Table
									id={userInfo.id}
									handleViewDetails={handleViewDetails}
									state={state}
								/>
							</Paper>
							{display}
						</Grid>
					</Grid>
				</Container>
			</div>
		);
	} else {
		return null;
	}
}
