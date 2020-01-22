import React from "react";
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
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Typography } from "@material-ui/core";
import swal from "sweetalert";
import jwt from "jsonwebtoken";

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
	},
	choose: {
		fontSize: "14px",
		color: "gray"
	}
}));

export default function ViewGroup(props) {
	const classes = useStyles();
	const { contactId } = props;
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const [open, setOpen] = React.useState(false);
	const [state, setState] = React.useState([]);
	const [value, setValue] = React.useState("");
	const [select, setSelect] = React.useState(null);

	const handleFetch = contactId => {
		var userId = jwt.decode(localStorage.getItem("Token")).userId;
		console.log(contactId, userId);

		axios
			.get(`http://localhost:3006/groupcontacts/${contactId}/${userId}`)
			.then(res => {
				console.log(res.data);
				setState(res.data);
			});
	};

	const handleClickOpen = () => {
		handleFetch(contactId);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = event => {
		setValue(event.target.value);
	};

	const handleChoose = groupId => {
		setSelect(groupId);
	};

	const handleAddContactsGroup = () => {
		axios
			.post(`http://localhost:3006/groupmembers`, {
				groupid: select,
				contactid: contactId
			})
			.then(res => {
				handleFetch(contactId);
				handleClose();
				swal({
					title: `Contact Successfully Added to ${value}!`,
					icon: "success",
					button: true
				});
			});
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
					<Typography className={classes.choose}>
						Choose ONE of the following:
					</Typography>
					<RadioGroup
						aria-label="groups"
						name="choose a group"
						value={value}
						onChange={handleChange}
					>
						<FormControl component="fieldset">
							{state.map((name, i) => {
								return (
									<FormGroup key={i}>
										<FormControlLabel
											control={
												<Radio
													value={name.groupname}
													color="primary"
													onClick={() => {
														handleChoose(name.id);
													}}
												/>
											}
											label={name.groupname}
										/>
									</FormGroup>
								);
							})}
						</FormControl>
					</RadioGroup>
				</DialogContent>
				<DialogActions className={classes.bottomLabel}>
					<Button autoFocus onClick={handleClose} style={{ color: "white" }}>
						Close
					</Button>
					<Button
						autoFocus
						style={{ color: "white" }}
						onClick={() => {
							handleAddContactsGroup();
						}}
					>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
