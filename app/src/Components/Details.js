import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Icon from "../assets/images/cont.png";
import close from "../assets/images/cross.png";

import EditContact from "./EditContact";

const useStyles = makeStyles(theme => ({
	details: {
		background: "linear-gradient(to bottom right, #7c7cca 8%, #89bafa 69%)",
		width: "97%",
		height: "auto",
		marginTop: "2vh",
		marginBottom: "2vh",
		paddingTop: "15px",
		paddingBottom: "35px",
		"@media (max-width: 767px)": {
			width: "100%",
			marginBottom: "5vh"
		}
	},
	head: {
		padding: "5px",
		textAlign: "left",
		marginLeft: "4vw",
		fontSize: "20px",
		color: "white",
		letterSpacing: "3px",
		fontWeight: "bold",
		width: "15vw",
		marginBottom: "2vh",
		borderRadius: "20px",
		"@media (max-width: 767px)": {
			fontSize: "15px",
			width: "60%",
			marginBottom: "2vh"
		}
	},
	info: {
		marginTop: "1vh",
		textAlign: "left",
		fontStyle: "italic",
		marginLeft: "5vw",
		display: "flex",
		alignItems: "center",
		color: "white",
		"@media (max-width: 767px)": {
			marginTop: "0vh",
			fontSize: "14px"
		}
	},
	icon: {
		width: "40px"
	},
	flex: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly"
	},
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
	},
	title: {
		textTransform: "Capitalize",
		color: "Purple"
	},
	pad: {
		paddingRight: "5px"
	},
	closeEdit: {
		display: "flex",
		flexDirection: "column"
	},
	"@media (max-width: 767px)": {
		flexDirection: "row"
	}
}));

export default function Details(props) {
	const classes = useStyles();
	const { handleCloseDetails } = props;

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

	return (
		<React.Fragment>
			<Paper className={classes.details}>
				<Typography className={classes.head}>
					<span className={classes.flex}>
						<img src={Icon} className={classes.icon} alt="icon" />
						<span>Contact Details</span>
					</span>
				</Typography>
				<Grid container>
					<Grid item xs={12} sm={5}>
						<Typography className={classes.info}>
							<b className={classes.pad}>First Name:</b>{" "}
							<span className={classes.title}>{firstname}</span>
						</Typography>
						<Typography className={classes.info}>
							<b className={classes.pad}>Last Name:</b>{" "}
							<span className={classes.title}>{lastname}</span>
						</Typography>
						<Typography className={classes.info}>
							<b className={classes.pad}>Home Phone#: </b>{" "}
							<span className={classes.title}>{home_phone}</span>
						</Typography>
						<Typography className={classes.info}>
							<b className={classes.pad}>Mobile Phone#: </b>{" "}
							<span className={classes.title}>{mobile_phone}</span>
						</Typography>
						<Typography className={classes.info}>
							<b className={classes.pad}>Work Phone#: </b>{" "}
							<span className={classes.title}>{work_phone}</span>
						</Typography>
					</Grid>
					<Grid item xs={12} sm={5}>
						<Typography className={classes.info}>
							<b className={classes.pad}>Email:</b>{" "}
							<span style={{ color: "purple" }}>{email}</span>
						</Typography>
						<Typography className={classes.info}>
							<b className={classes.pad}>City:</b>{" "}
							<span className={classes.title}>{city}</span>
						</Typography>
						<Typography className={classes.info}>
							<b className={classes.pad}>State or Province: </b>{" "}
							<span className={classes.title}>{state_or_province}</span>
						</Typography>
						<Typography className={classes.info}>
							<b className={classes.pad}>Postal Code: </b>{" "}
							<span className={classes.title}>{postal_code}</span>
						</Typography>
						<Typography className={classes.info}>
							<b className={classes.pad}>Country: </b>{" "}
							<span className={classes.title}>{country}</span>
						</Typography>
					</Grid>
					<Grid item xs={12} sm={2} align="center">
						<div className={classes.closeEdit}>
							<EditContact
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
								contactId={contactId}
							/>
							<div className={classes.edit} onClick={handleCloseDetails}>
								<img src={close} alt="close" className={classes.editIcon} />
								<span style={{ fontSize: "12px" }}>Close</span>
							</div>
						</div>
					</Grid>
				</Grid>
			</Paper>
		</React.Fragment>
	);
}
