import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTheme } from "@material-ui/core/styles";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloseTwoToneIcon from "@material-ui/icons/CloseTwoTone";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
	viewMembers: {
		cursor: "pointer",
		padding: "2px",
		marginRight: "1px",
		"&:hover": {
			background: "lightgray",
			borderRadius: "50%",
			padding: "2px",
			marginRight: "1px"
		}
	},
	headTitle: {
		background: "#7c7cca",
		color: "white",
		marginBottom: "10px"
	},
	bottomLabel: {
		background: "#7c7cca"
	},
	iconStyle: {
		fontSize: "12px",
		color: "red",
		cursor: "pointer",
		"&:hover": {
			color: "black"
		}
	}
}));

export default function ViewGroup(props) {
	const classes = useStyles();
	const { handleGroupMembersList, groupId, members } = props;
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();

	const handleClickOpen = () => {
		setOpen(true);
		handleGroupMembersList(groupId);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleRemoveMember = (groupId, contactId) => {
		axios({
			method: "delete",
			url: `http://localhost:3006/groupmembers/${groupId}/${contactId}`
		}).then(() => {
			handleGroupMembersList(groupId);
		});
	};

	return (
		<div>
			<Tooltip title="View Group">
				<VisibilityTwoToneIcon
					color="primary"
					className={classes.viewMembers}
					fontSize="small"
					onClick={handleClickOpen}
				/>
			</Tooltip>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="responsive-dialog-title" className={classes.headTitle}>
					{"Group Members"}
				</DialogTitle>
				{members.map((data, i) => {
					return (
						<DialogContent
							style={{ display: "flex", alignItems: "center" }}
							key={i}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center"
								}}
							>
								<AccountCircleIcon
									fontSize="small"
									style={{ marginRight: "15px" }}
								/>
								<Typography
									style={{ textTransform: "capitalize", marginRight: "30px" }}
								>
									{" "}
									{data.contacts[0].firstname} {data.contacts[0].lastname}{" "}
								</Typography>
							</div>
							<Tooltip title="Remove from Group">
								<CloseTwoToneIcon
									className={classes.iconStyle}
									onClick={() => {
										handleRemoveMember(data.groupid, data.contactid);
									}}
								/>
							</Tooltip>
						</DialogContent>
					);
				})}

				<DialogActions className={classes.bottomLabel}>
					<Button autoFocus onClick={handleClose} style={{ color: "white" }}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
