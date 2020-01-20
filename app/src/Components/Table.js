import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import view from "../assets/images/eye.png";
import trash from "../assets/images/delete.png";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AddToGroup from "./AddToGroup";
import jwt from "jsonwebtoken";

const useStyles = makeStyles({
	table: {
		minWidth: 650
	},
	cellStyle: {
		fontWeight: "bold",
		color: "white"
	},
	rowStyle: {
		textTransform: "capitalize"
	},
	heading: {
		width: "1vw"
	},
	view: {
		width: "25px",
		cursor: "pointer"
	},
	action: {
		display: "flex",
		justifyContent: "space-evenly"
	}
});

export default function SimpleTable(props) {
	const classes = useStyles();
	const { handleViewDetails, state, id, getData } = props;
	const tokenDecoded = jwt.decode(localStorage.getItem("Token"));

	let history = useHistory();

	const [setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleDeleteContact = contactId => {
		confirmAlert({
			title: "Are you sure?",
			message: "You want to delete?",
			buttons: [
				{
					label: "Yes",
					onClick: () => {
						axios({
							method: "delete",
							url: `http://localhost:3006/contacts/${contactId}`
						}).then(() => {
							getData(tokenDecoded, "asc");
						});
					}
				},
				{
					label: "No",
					onClick: () => {
						history.push("/home");
					}
				}
			]
		});
	};

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead style={{ background: "#7c7ccacf" }}>
					<TableRow>
						<TableCell className={classes.cellStyle}>First Name</TableCell>
						<TableCell className={classes.cellStyle}>Last Name</TableCell>
						<TableCell className={classes.cellStyle}>Home Phone #</TableCell>
						<TableCell className={classes.cellStyle}>Mobile Phone #</TableCell>
						<TableCell className={classes.cellStyle}>Work Phone #</TableCell>
						<TableCell align="center" className={classes.cellStyle}>
							Action
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{state.map(row => (
						<TableRow key={row.id}>
							<TableCell
								component="th"
								scope="row"
								className={classes.rowStyle}
							>
								{row.firstname}
							</TableCell>
							<TableCell className={classes.rowStyle}>{row.lastname}</TableCell>
							<TableCell>{row.home_phone}</TableCell>
							<TableCell>{row.mobile_phone}</TableCell>
							<TableCell>{row.work_phone}</TableCell>
							<TableCell className={classes.action}>
								<Tooltip title="View Details">
									<img
										src={view}
										className={classes.view}
										alt={row.id}
										onClick={() => handleViewDetails(row.id)}
									/>
								</Tooltip>
								<AddToGroup handleClose={handleClose} userId={id} />
								<Tooltip title="Delete">
									<img
										src={trash}
										className={classes.view}
										alt="delete"
										onClick={() => handleDeleteContact(row.id)}
									/>
								</Tooltip>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
