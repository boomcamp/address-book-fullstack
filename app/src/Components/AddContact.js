import React, { useState, useEffect } from "react";
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

export default function ResponsiveDialog(props) {
	const { handleClose, openModal, handleChange, firstName } = props;

	const [required, setRequired] = useState(false);
	const [lastName, setLastName] = useState("");
	const [homePhone, setHomePhone] = useState("");
	const [mobilePhone, setMobilePhone] = useState("");
	const [workPhone, setWorkPhone] = useState("");
	const [email, setEmail] = useState("");
	const [city, setCity] = useState("");
	const [stateOrProvince, setStateOrProvince] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [country, setCountry] = useState("");

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const pass = firstName => {
		if (firstName) {
			console.log(firstName);
		}
	};

	return (
		<div>
			<Dialog
				fullScreen={fullScreen}
				open={openModal}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					{"Add New Contact"}
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
				<DialogActions>
					<Button autoFocus onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={pass(firstName)} color="primary" autoFocus>
						Add Contact
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
