import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import jwt from "jsonwebtoken";
import swal from "sweetalert";

const useStyles = makeStyles(theme => ({
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

export default function ViewGroup(props) {
	const classes = useStyles();
	const { groupname, id } = props;
	const [open, setOpen] = React.useState(false);
	const [editGroupName, setEditGroup] = React.useState("");
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const tokenDecoded = jwt.decode(localStorage.getItem("Token"));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleEditGroupName = editGroupName => {
		axios
			.patch(`http://localhost:3006/group-contacts/${id}`, {
				userid: `${tokenDecoded.userId}`,
				editGroupName
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
	};

	useEffect(() => {
		setEditGroup(groupname);
	}, [setEditGroup, groupname]);

	return (
		<div>
			<Tooltip title="Edit Group Name">
				<EditTwoToneIcon
					fontSize="small"
					color="primary"
					className={classes.addMember}
					style={{ marginRight: "0", marginLeft: "1px" }}
					onClick={handleClickOpen}
				/>
			</Tooltip>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					{"Edit Group Name"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<form className={classes.root} noValidate autoComplete="off">
							<TextField
								id="outlined-basic"
								label="Group Name"
								variant="outlined"
								value={editGroupName}
								onChange={e => {
									setEditGroup(e.target.value);
								}}
							/>
						</form>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} color="primary">
						Close
					</Button>
					<Button
						onClick={handleClose}
						color="primary"
						autoFocus
						onClick={() => handleEditGroupName(editGroupName)}
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
