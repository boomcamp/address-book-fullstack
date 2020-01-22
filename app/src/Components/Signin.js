import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Fade from "@material-ui/core/Fade";
import swal from "sweetalert";
import jwt from "jsonwebtoken";
import login from "../assets/images/login.png";
import ab from "../assets/images/ab.png";

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: "50%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		"@media (max-width: 768px)": {
			marginTop: "25%",
			marginBottom: "10%"
		}
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(2)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	loginIcon: {
		width: "100px",
		marginBottom: theme.spacing(1.5)
	},
	titleHeader: {
		width: "100%",
		background: "#5e6eca",
		padding: "5px",
		color: "white",
		border: "1px solid #7887b6",
		borderRadius: "40px"
	},
	abook: {
		position: "absolute",
		right: "40%",
		top: "10%",
		width: "20%",
		"@media (max-width: 1024px)": {
			display: "none"
		}
	},
	act: {
		color: "#3f51b5",
		textDecoration: "none",
		"&:hover": {
			color: "#D35932"
		}
	}
}));

export default function SignIn() {
	const classes = useStyles();
	let history = useHistory();

	useEffect(() => {
		if (localStorage.getItem("Token")) {
			if (jwt.decode(localStorage.getItem("Token")).userId) {
				history.push("/home");
			}
		}
	});

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsgUsername, setErrorMsgUsername] = useState("");
	const [errorMsgPassword, setErrorMsgPassword] = useState("");

	const validate = (e, username, password) => {
		password === ""
			? setErrorMsgPassword("This field is required!")
			: setErrorMsgPassword("");

		username === ""
			? setErrorMsgUsername("This field is required!")
			: setErrorMsgUsername("");

		if (username !== "" && password !== "") {
			axios
				.post("http://localhost:3006/users/login", {
					username: username,
					password: password
				})
				.then(res => {
					swal({
						title: "Logged In Successfully!",
						icon: "success",
						button: true
					});
					sessionStorage.setItem("isLoggedIn", true);
					localStorage.setItem("Token", res.data.token);
					localStorage.setItem("user", JSON.stringify(res.data));
					history.push("/home");
				})
				.catch(err => {
					swal({
						title: "Login Failed!",
						icon: "error",
						button: true
					});
				});
			e.preventDefault();
		} else {
			e.preventDefault();
		}
	};

	const onChange = (e, set, cError) => {
		set(e);
		cError("");
	};

	return (
		<React.Fragment>
			<img src={ab} className={classes.abook} alt="ab" />

			<Fade in>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className={classes.paper}>
						<img className={classes.loginIcon} src={login} alt="icon" />

						<Typography
							component="h1"
							variant="h5"
							className={classes.titleHeader}
						>
							Sign In
						</Typography>

						<form className={classes.form} noValidate>
							<TextField
								error={errorMsgUsername === "" ? false : true}
								helperText={
									errorMsgUsername === "" ? false : "This field is required!"
								}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								autoFocus
								onChange={e =>
									onChange(e.target.value, setUsername, setErrorMsgUsername)
								}
							/>

							<TextField
								error={errorMsgPassword === "" ? false : true}
								helperText={
									errorMsgPassword === "" ? false : "This field is required!"
								}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={e =>
									onChange(e.target.value, setPassword, setErrorMsgPassword)
								}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={e => validate(e, username, password)}
							>
								Sign In
							</Button>
							<Grid container>
								<Grid item>
									<Link to="/register" className={classes.act}>
										{"Don't have an account? Sign up"}
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</Container>
			</Fade>
		</React.Fragment>
	);
}
