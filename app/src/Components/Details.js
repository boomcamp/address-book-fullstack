import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Paper from "@material-ui/core/Paper";
import Icon from "../assets/images/cont.png";
// import edit from "../assets/images/edit.png";

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
		marginLeft: "9vw",
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
		marginLeft: "10vw",
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
		width: "30px"
	}
}));

export default function Details() {
	const classes = useStyles();

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
					<Grid item xs={12} sm={6}>
						<Typography className={classes.info}>
							<b>First Name:</b> Utot
						</Typography>
						<Typography className={classes.info}>
							<b>Last Name:</b> Utot
						</Typography>
						<Typography className={classes.info}>
							<b>Home Phone#: </b> 45441
						</Typography>
						<Typography className={classes.info}>
							<b>Mobile Phone#: </b> 45441
						</Typography>
						<Typography className={classes.info}>
							<b>Work Phone#: </b> 45441
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography className={classes.info}>
							<b>Email:</b> Utot@gmail.com
						</Typography>
						<Typography className={classes.info}>
							<b>City:</b> Utot
						</Typography>
						<Typography className={classes.info}>
							<b>State or Province: </b> tubol
						</Typography>
						<Typography className={classes.info}>
							<b>Postal Code: </b> 45441
						</Typography>
						<Typography className={classes.info}>
							<b>Country: </b> Philippines
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		</React.Fragment>
	);
}
