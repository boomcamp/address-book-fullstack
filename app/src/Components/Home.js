import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import swal from "sweetalert";
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";

import ablogo from "../assets/images/address-book.png";

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
		width: "25vw",
		height: "20vh",
		background: "pink",
		position: "absolute",
		top: "21.5vh",
		right: "3vw"
	}
}));

export default function ButtonAppBar() {
	const [state, setState] = React.useState({
		columns: [
			{ title: "Name", field: "name" },
			{ title: "Surname", field: "surname" },
			{ title: "Birth Year", field: "birthYear", type: "numeric" },
			{
				title: "Birth Place",
				field: "birthCity",
				lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
			}
		],
		data: [{ name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 }]
	});

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
		swal(`Logged out Successfully!`).then(function() {
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
							<Button className={classes.nameColor}>Marcial Norte</Button>
							<Button color="inherit" className={classes.but} onClick={logout}>
								Logout
							</Button>
						</div>
					</Toolbar>
				</AppBar>

				<MaterialTable
					style={{
						width: "65%",
						marginLeft: "3vw",
						marginTop: "15vh"
					}}
					title="Contact List"
					columns={state.columns}
					data={state.data}
					editable={{
						onRowAdd: newData =>
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									setState(prevState => {
										const data = [...prevState.data];
										data.push(newData);
										return { ...prevState, data };
									});
								}, 600);
							}),
						onRowUpdate: (newData, oldData) =>
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									if (oldData) {
										setState(prevState => {
											const data = [...prevState.data];
											data[data.indexOf(oldData)] = newData;
											return { ...prevState, data };
										});
									}
								}, 600);
							}),
						onRowDelete: oldData =>
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									setState(prevState => {
										const data = [...prevState.data];
										data.splice(data.indexOf(oldData), 1);
										return { ...prevState, data };
									});
								}, 600);
							})
					}}
				/>

				<Paper className={classes.paper}></Paper>
			</div>
		);
	}
}
