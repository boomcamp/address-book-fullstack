import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import editIcon from "../assets/images/draw.png";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";

const useStyles = makeStyles(theme => ({
	edit: {
		marginTop: "15px",
		borderRadius: "50%",
		padding: "10px",
		width: "20%",
		height: "25%",
		background: "white",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
		"&:hover": {
			background: "#b3e8ff",
			color: "purple"
		},
		"@media (max-width: 767px)": {
			borderRadius: "0",
			width: "50%",
			flexDirection: "row",
			background: "transparent",
			"&:hover": {
				background: "transparent",
				color: "purple"
			}
		}
	},
	editIcon: {
		width: "20px",
		marginBottom: "10px",
		"@media (max-width: 767px)": {
			width: "20px"
		}
	}
}));

export default function ResponsiveDialog(props) {
	const [open, setOpen] = React.useState(false);

	const theme = useTheme();
	const classes = useStyles();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const {
		firstname,
		lastname,
		home_phone,
		mobile_phone,
		work_phone,
		email,
		city,
		state_or_province,
		postal_code,
		country,
		contactId
	} = props;

	const [required, setRequired] = useState(false);
	const [editFirstname, setFirstName] = useState("");
	const [editLastname, setLastName] = useState("");
	const [edit_home_phone, setHomePhone] = useState("");
	const [edit_mobile_phone, setMobilePhone] = useState("");
	const [edit_work_phone, setWorkPhone] = useState("");
	const [editEmail, setEmail] = useState("");
	const [editCity, setCity] = useState("city");
	const [edit_state_or_province, setStateOrProvince] = useState("");
	const [edit_postal_code, setPostalCode] = useState("");
	const [editCountry, setCountry] = useState("");

	const handleChange = e => {
		setFirstName(e.target.value);
		setRequired(false);
	};

	const pass = editFirstname => {
		if (editFirstname) {
			axios
				.patch(`http://localhost:3006/contacts/${contactId}`, {
					editFirstname,
					editLastname,
					edit_home_phone,
					edit_mobile_phone,
					edit_work_phone,
					editEmail,
					editCity,
					edit_state_or_province,
					edit_postal_code,
					editCountry
				})
				.then(() => {
					setOpen(false);
					swal({
						icon: "success",
						title: "Edit Successful"
					}).then(() => {
						window.location = "/home";
					});
				});
		}
	};

	useEffect(() => {
		setFirstName(firstname);
		setLastName(lastname);
		setHomePhone(home_phone);
		setMobilePhone(mobile_phone);
		setWorkPhone(work_phone);
		setEmail(email);
		setCity(city);
		setStateOrProvince(state_or_province);
		setPostalCode(postal_code);
		setCountry(country);
	}, [
		firstname,
		setFirstName,
		lastname,
		setLastName,
		home_phone,
		setHomePhone,
		mobile_phone,
		setMobilePhone,
		work_phone,
		setWorkPhone,
		email,
		city,
		setCity,
		state_or_province,
		setStateOrProvince,
		postal_code,
		setPostalCode,
		country,
		setCountry
	]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<div className={classes.edit} onClick={handleClickOpen}>
				<img src={editIcon} alt="edit" className={classes.editIcon} />
				<span style={{ fontSize: "12px" }}>Edit</span>
			</div>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle
					style={{ background: "#7c7cca" }}
					id="responsive-dialog-title"
				>
					<span style={{ color: "white" }}>Edit Contact</span>
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								error={required}
								helperText={required ? "This field is required!" : false}
								required
								id="firstName"
								name="firstName"
								label="First name"
								fullWidth
								autoComplete="fname"
								value={editFirstname}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="lastName"
								name="lastName"
								label="Last name"
								fullWidth
								autoComplete="lname"
								value={editLastname}
								onChange={e => {
									setLastName(e.target.value);
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="home_phone"
								name="home_phone"
								label="Home Phone#"
								fullWidth
								autoComplete="hphone"
								value={edit_home_phone}
								onChange={e => {
									setHomePhone(e.target.value);
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="mobile_phone"
								name="mobile_phone"
								label="Mobile Phone#"
								fullWidth
								autoComplete="mphone"
								value={edit_mobile_phone}
								onChange={e => {
									setMobilePhone(e.target.value);
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="work_phone"
								name="work_phone"
								label="Work Phone#"
								fullWidth
								autoComplete="wphone"
								value={edit_work_phone}
								onChange={e => {
									setWorkPhone(e.target.value);
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="email"
								name="email"
								label="Email Address"
								fullWidth
								autoComplete="email"
								value={editEmail}
								onChange={e => {
									setEmail(e.target.value);
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="city"
								name="city"
								label="City"
								fullWidth
								value={editCity}
								onChange={e => {
									setCity(e.target.value);
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="state"
								name="state"
								label="State/Province"
								fullWidth
								value={edit_state_or_province}
								onChange={e => {
									setStateOrProvince(e.target.value);
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="zip"
								name="zip"
								label="Zip / Postal code"
								fullWidth
								autoComplete="postal-code"
								value={edit_postal_code}
								onChange={e => {
									setPostalCode(e.target.value);
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="country"
								name="country"
								label="Country"
								fullWidth
								autoComplete="country"
								value={editCountry}
								onChange={e => {
									setCountry(e.target.value);
								}}
							/>
						</Grid>
					</Grid>
				</DialogContent>

				<DialogActions style={{ background: "#7c7cca" }}>
					<Button
						style={{ color: "white" }}
						autoFocus
						onClick={handleClose}
						color="inherit"
					>
						Cancel
					</Button>
					<Button
						style={{ color: "white" }}
						onClick={() => pass(editFirstname)}
						autoFocus
					>
						Save Changes
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
