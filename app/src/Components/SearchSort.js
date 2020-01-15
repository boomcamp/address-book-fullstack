import React from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import sort from "../assets/images/swap.png";
const useStyles = makeStyles(theme => ({
	paper: {
		width: "auto",
		height: "auto",
		background: "#a4beeb",
		marginTop: "5vh",
		"@media (max-width: 767px)": {
			marginTop: "5vh"
		}
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.3),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginLeft: 0,
		width: "auto",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(0),
			width: "auto"
		}
	},
	searchIcon: {
		width: theme.spacing(7),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "#7c7cca"
	},
	inputRoot: {
		color: "inherit"
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: 120,
			"&:focus": {
				width: 250
			}
		}
	},
	paper1: {
		background: "white",
		width: "100%",
		height: "40vh",
		marginTop: "1vh",
		border: "2px solid #7c7cca",
		"@media (max-width: 767px)": {
			marginTop: "5vh"
		}
	},
	paper2: {
		background: "white",
		width: "100%",
		height: "24.5vh",
		marginTop: "1vh",
		border: "2px solid #7c7cca",
		"@media (max-width: 767px)": {
			marginTop: "1vh",
			display: "none"
		}
	},
	addGroup: {
		paddingLeft: "2vw",
		paddingTop: "5vh",
		fontSize: "20px",
		fontWeight: "bold",
		"@media (max-width: 767px)": {
			paddingLeft: "30px",
			fontSize: "16px"
		}
	},
	groupField: {
		marginTop: "20px",
		width: "80%"
	},
	addButton: {
		marginTop: "15px",
		"@media (max-width: 767px)": {
			fontSize: "12px"
		}
	}
}));

export default function ButtonAppBar() {
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const classes = useStyles();

	return (
		<Container>
			<Paper className={classes.paper}>
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder="Search…"
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput
						}}
						inputProps={{ "aria-label": "search" }}
					/>
				</div>

				<ListItem button onClick={handleClick}>
					<ListItemIcon>
						<img
							src={sort}
							alt="sort"
							style={{
								width: "25px",
								marginRight: "5px"
							}}
						/>
					</ListItemIcon>
					<ListItemText primary="Sort (by Lastname)" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem button>
							<ListItemIcon>
								<ArrowUpwardIcon />
							</ListItemIcon>
							<ListItemText primary="Ascending" />
						</ListItem>
						<ListItem button>
							<ListItemIcon>
								<ArrowDownwardIcon />
							</ListItemIcon>
							<ListItemText primary="Descending" />
						</ListItem>
					</List>
				</Collapse>
			</Paper>
			<Paper className={classes.paper1}>
				<Typography align="left" className={classes.addGroup}>
					Add Group
				</Typography>
				<TextField
					id="outlined-basic"
					label="Group name"
					variant="outlined"
					className={classes.groupField}
				/>
				<Button
					variant="contained"
					color="primary"
					className={classes.addButton}
				>
					Add Group
				</Button>
			</Paper>
			<Paper className={classes.paper2}></Paper>
		</Container>
	);
}
