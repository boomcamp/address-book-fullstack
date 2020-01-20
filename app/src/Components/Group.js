import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import AddMember from "../assets/images/add.png";
import DeleteOutlineTwoToneIcon from "@material-ui/icons/DeleteOutlineTwoTone";
import Tooltip from "@material-ui/core/Tooltip";
import jwt from "jsonwebtoken";
import ViewGroup from "./ViewGroup";
import EditGroup from "./EditGroup";
import swal from "sweetalert";
import GroupTwoToneIcon from "@material-ui/icons/GroupTwoTone";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useHistory } from "react-router-dom";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

const useStyles = makeStyles(theme => ({
	paper1: {
		background: "white",
		width: "100%",
		height: "41.4vh",
		marginTop: "1vh",
		border: "1px solid #a5b8eb",
		overflow: "auto",
		"@media (max-width: 767px)": {
			marginTop: "5vh",
			width: "100%",
			marginBottom: "5vh"
		},
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
			backgroundColor: "#a5b8eb"
		}
	},
	paper2: {
		background: "white",
		width: "100%",
		height: "auto",
		marginTop: "1vh",
		border: "2px solid #7c7cca",
		paddingBottom: "3vh",
		"@media (max-width: 767px)": {
			marginTop: "1vh",
			paddingBottom: "3vh"
		}
	},
	addGroup: {
		paddingLeft: "2vw",
		paddingTop: "1vh",
		paddingBottom: "1vh",
		fontSize: "20px",
		fontWeight: "bold",
		background: "#7c7cca",
		color: "white",
		display: "flex",
		alignItems: "center",
		"@media (max-width: 767px)": {
			paddingLeft: "30px",
			fontSize: "16px"
		}
	},
	groupField: {
		marginTop: "30px",
		width: "80%"
	},
	addButton: {
		marginTop: "15px",
		"@media (max-width: 767px)": {
			fontSize: "12px",
			marginBottom: "px"
		}
	},
	groupFlex: {
		margin: "2vw",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between"
	},
	groupName: {
		display: "flex",
		alignItems: "center"
	},
	addMember: {
		width: "20px",
		cursor: "pointer",
		padding: "2px",
		"&:hover": {
			background: "lightgray",
			borderRadius: "50%",
			padding: "2px"
		}
	}
}));

export default function ButtonAppBar(props) {
	const classes = useStyles();
	const { contactId } = props;
	const [setOpen] = useState(false);
	const [setOpenEdit] = useState(false);
	const [state, setState] = useState([]);
	const [members, setMembers] = useState([]);
	const [groupname, setGroupName] = useState("");
	const tokenDecoded = jwt.decode(localStorage.getItem("Token"));
	let history = useHistory();

	const handleClose = () => {
		setOpen(false);
	};

	const handleCloseEdit = () => {
		setOpenEdit(false);
	};

	const handleAddGroup = () => {
		axios
			.post(`http://localhost:3006/group-contacts/`, {
				userid: `${tokenDecoded.userId}`,
				groupname: groupname
			})
			.then(res => {
				swal({
					icon: "success",
					title: "Successfully Added A Group"
				}).then(() => {
					window.location = "/home";
				});
			});
	};

	const handleShow = () => {
		axios({
			method: "get",
			url: `http://localhost:3006/group-contacts/${tokenDecoded.userId}`
		}).then(res => {
			setState(res.data);
		});
	};

	const handleGroupMembersList = groupId => {
		axios({
			method: "get",
			url: `http://localhost:3006/groupmembers/${groupId}`
		}).then(res => {
			setMembers(res.data);
		});
	};

	const handleDeleteContact = groupid => {
		confirmAlert({
			title: "Are you sure?",
			message: "You want to delete?",
			buttons: [
				{
					label: "Yes",
					onClick: () => {
						axios({
							method: "delete",
							url: `http://localhost:3006/group-contacts/${groupid}`
						}).then(() => {
							handleShow();
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

	useEffect(() => {
		async function result() {
			await axios({
				method: "get",
				url: `http://localhost:3006/group-contacts/${tokenDecoded.userId}`
			}).then(res => {
				setState(res.data);
			});
		}
		result();
	}, [tokenDecoded.userId]);

	return (
		<React.Fragment>
			<Paper className={classes.paper2}>
				<Typography align="left" className={classes.addGroup}>
					<GroupAddIcon style={{ paddingRight: "10px" }} />{" "}
					<span>Add Group</span>
				</Typography>
				<TextField
					id="outlined-basic"
					label="Group name"
					variant="outlined"
					className={classes.groupField}
					onChange={e => setGroupName(e.target.value)}
				/>
				<Button
					variant="contained"
					color="primary"
					className={classes.addButton}
					onClick={handleAddGroup}
				>
					Add Group
				</Button>
			</Paper>

			<Paper className={classes.paper1} style={{ borderColor: "#beacda" }}>
				<Typography
					align="left"
					className={classes.addGroup}
					style={{
						background: "#beacda"
					}}
				>
					Groups
				</Typography>
				{state.map((data, i) => {
					return (
						<div className={classes.groupFlex} key={i}>
							<div className={classes.groupName}>
								<Avatar
									style={{
										marginRight: "1vw",
										background: "#beacda"
									}}
								>
									<GroupTwoToneIcon />
								</Avatar>
								<Typography>{data.groupname}</Typography>
							</div>
							<div className={classes.groupName}>
								<ViewGroup
									handleClose={handleClose}
									handleGroupMembersList={handleGroupMembersList}
									groupId={data.id}
									members={members}
								/>
								<EditGroup
									handleCloseEdit={handleCloseEdit}
									id={data.id}
									groupname={data.groupname}
									handleShow={handleShow}
								/>
								<Tooltip title="Delete Group">
									<DeleteOutlineTwoToneIcon
										fontSize="small"
										color="primary"
										className={classes.addMember}
										style={{ marginRight: "0", marginLeft: "1px" }}
										onClick={() => handleDeleteContact(data.id)}
									/>
								</Tooltip>
							</div>
						</div>
					);
				})}
			</Paper>
		</React.Fragment>
	);
}
