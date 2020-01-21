import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import jwt from "jsonwebtoken";

const useStyles = makeStyles(theme => ({
	addIcon: {
		color: "#7c7cca",
		marginTop: "5px",
		cursor: "pointer"
	}
}));

export default function ResponsiveDialog(props) {
	const classes = useStyles();
	const { getData } = props;
	const [openModal, setOpenModal] = React.useState(false);
	const [firstname, setFirstName] = useState("");

	var userId;

	userId = jwt.decode(localStorage.getItem("Token")).userId;

	const handleClose = firstName => {
		setOpenModal(false);
	};

	const handleChange = e => {
		setFirstName(e.target.value);
		setRequired(false);
	};

	const handleClickOpen = () => {
		setOpenModal(true);
	};

	const [required, setRequired] = useState(false);
	const [lastname, setLastName] = useState("");
	const [home_phone, setHomePhone] = useState(null);
	const [mobile_phone, setMobilePhone] = useState(null);
	const [work_phone, setWorkPhone] = useState(null);
	const [email, setEmail] = useState("");
	const [city, setCity] = useState("");
	const [state_or_province, setStateOrProvince] = useState("");
	const [postal_code, setPostalCode] = useState(null);
	const [country, setCountry] = useState("");

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const pass = firstname => {
		if (firstname) {
			axios
				.post(`http://localhost:3006/contacts/${props.id}`, {
					firstname,
					lastname,
					home_phone,
					mobile_phone,
					work_phone,
					email,
					city,
					state_or_province,
					postal_code,
					country
				})
				.then(res => {
					setOpenModal(false);
					swal({
						icon: "success",
						title: "Successful Added New Contact"
					}).then(() => {
						getData(userId, "asc");
					});
				});
		} else {
			setRequired(true);
		}
	};

	return (
		<React.Fragment>
			<Tooltip title="Add New Contact">
				<AddIcon className={classes.addIcon} onClick={handleClickOpen} />
			</Tooltip>
			<Dialog
				fullScreen={fullScreen}
				open={openModal}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle
					style={{ background: "#7c7cca" }}
					id="responsive-dialog-title"
				>
					<span style={{ color: "white" }}>Add New Contact</span>
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
								onChange={e => {
									setHomePhone(e.target.value);
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="mobile_phone"
								name="mobile_phone"
								label="Mobile Phone#"
								fullWidth
								autoComplete="mphone"
								onChange={e => {
									setMobilePhone(e.target.value);
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="work_phone"
								name="work_phone"
								label="Work Phone#"
								fullWidth
								autoComplete="wphone"
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
								autoComplete="city"
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
						onClick={() => pass(firstname)}
						autoFocus
					>
						Add Contact
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
