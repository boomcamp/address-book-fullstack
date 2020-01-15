import React, { useState } from "react";
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
		country
	} = props;

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
								required
								id="firstName"
								name="firstName"
								label="First name"
								fullWidth
								autoComplete="fname"
								value={firstname}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="lastName"
								name="lastName"
								label="Last name"
								fullWidth
								autoComplete="lname"
								value={lastname}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="home_phone"
								name="home_phone"
								label="Home Phone#"
								fullWidth
								autoComplete="hphone"
								value={home_phone}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="mobile_phone"
								name="mobile_phone"
								label="Mobile Phone#"
								fullWidth
								autoComplete="mphone"
								value={mobile_phone}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="work_phone"
								name="work_phone"
								label="Work Phone#"
								fullWidth
								autoComplete="wphone"
								value={work_phone}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="email"
								name="email"
								label="Email Address"
								fullWidth
								autoComplete="email"
								value={email}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="city"
								name="city"
								label="City"
								fullWidth
								autoComplete="city"
								value={city}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="state"
								name="state"
								label="State/Province"
								fullWidth
								value={state_or_province}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="zip"
								name="zip"
								label="Zip / Postal code"
								fullWidth
								autoComplete="postal-code"
								value={postal_code}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="country"
								name="country"
								label="Country"
								fullWidth
								autoComplete="country"
								value={country}
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
						// onClick={() => pass(firstname)}
						autoFocus
					>
						Save Changes
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
