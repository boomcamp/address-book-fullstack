import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import jwt from "jsonwebtoken";
import swal from "sweetalert";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

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
	},
	headTitle: {
		background: "#beacda",
		color: "white",
		marginBottom: "25px"
	},
	bottomLabel: {
		background: "#beacda"
	}
}));

export default function ViewGroup(props) {
	const classes = useStyles();
	const { groupname, id, handleShow } = props;
	const [open, setOpen] = React.useState(false);
	const [editGroupName, setEditGroup] = React.useState("");
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
				});
				window.location = "/home";
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
				TransitionComponent={Transition}
				keepMounted
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title" className={classes.headTitle}>
					{"Edit Group Name"}
				</DialogTitle>
				<DialogContent>
					<form className={classes.root} noValidate autoComplete="off">
						<TextField
							style={{ marginBottom: "2vh" }}
							id="outlined-basic"
							label="Group Name"
							variant="outlined"
							value={editGroupName}
							onChange={e => {
								setEditGroup(e.target.value);
							}}
						/>
					</form>
				</DialogContent>
				<DialogActions className={classes.bottomLabel}>
					<Button autoFocus onClick={handleClose} style={{ color: "white" }}>
						Close
					</Button>
					<Button
						style={{ color: "white" }}
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
