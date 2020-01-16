import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import Tooltip from "@material-ui/core/Tooltip";

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
	}
}));

export default function ViewGroup() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{"Group"}</DialogTitle>
				<DialogContent>
					<DialogContentText></DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} color="primary">
						Close
					</Button>
					<Button onClick={handleClose} color="primary" autoFocus>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
