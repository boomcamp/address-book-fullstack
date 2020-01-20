import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import addToGroup from "../assets/images/add-group.png";
import Tooltip from "@material-ui/core/Tooltip";
import jwt from "jsonwebtoken";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import swal from "sweetalert";

const useStyles = makeStyles(theme => ({
	view: {
		width: "20px",
		cursor: "pointer"
	},
	headTitle: {
		background: "#7c7cca",
		color: "white",
		marginBottom: "10px"
	},
	bottomLabel: {
		background: "#7c7cca"
	}
}));

export default function ViewGroup(props) {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const [open, setOpen] = React.useState(false);
	const [state, setState] = React.useState([]);

	const tokenDecoded = jwt.decode(localStorage.getItem("Token"));

	useEffect(() => {
		axios
			.get(`http://localhost:3006/group-contacts/${tokenDecoded.userId}`)
			.then(res => {
				setState(res.data);
			});
	}, [setState, tokenDecoded.userId]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Tooltip title="Add to Group">
				<img
					src={addToGroup}
					className={classes.view}
					alt="AddToGroup"
					onClick={handleClickOpen}
				/>
			</Tooltip>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title" className={classes.headTitle}>
					{"Add to Group"}
				</DialogTitle>
				<DialogContent>
					<FormControl component="fieldset">
						{state.map((name, i) => {
							return (
								<FormGroup key={i}>
									<FormControlLabel
										control={<Checkbox value={name.groupname} />}
										label={name.groupname}
									/>
								</FormGroup>
							);
						})}
					</FormControl>
				</DialogContent>
				<DialogActions className={classes.bottomLabel}>
					<Button autoFocus onClick={handleClose} style={{ color: "white" }}>
						Close
					</Button>
					<Button onClick={handleClose} autoFocus style={{ color: "white" }}>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
