import React, { useState } from "react";
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

import login from "../assets/images/login.png";

import ab from "../assets/images/ab.png";

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: "50%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		"@media (max-width: 768px)": {
			marginTop: "15%",
			marginBottom: "10%"
		}
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(3)
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

export default function SignUp() {
	const classes = useStyles();

	let history = useHistory();

	const [email, setEmail] = useState(null);
	const [validEmail, setValidEmail] = useState(null);
	const [username, setUsername] = useState(null);
	const [firstname, setFirstName] = useState(null);
	const [lastname, setLastName] = useState(null);
	const [password, setPassword] = useState(null);
	const [matchPassword, setMatchPassword] = useState(true);
	const [confirmPassword, setConfirmPassword] = useState(null);

	const auth = e => {
		if (
			firstname &&
			lastname &&
			email &&
			username &&
			password &&
			confirmPassword
		) {
			if (ifValidEmail(email)) {
				setValidEmail(true);
				if (password === confirmPassword) {
					setMatchPassword(true);

					axios.post("http://localhost:3006/users", {
						email: email,
						password: password,
						firstname: firstname,
						lastname: lastname,
						username: username
					});

					swal({
						title: "Signed Up Successfully!",
						icon: "success",
						button: true
					});

					history.push("/");
					e.preventDefault();
				} else {
					setMatchPassword(null);
					e.preventDefault();
				}
			} else {
				setValidEmail(false);
				e.preventDefault();
			}
		} else {
			nullChecker(firstname, setFirstName);
			nullChecker(lastname, setLastName);
			nullChecker(username, setUsername);
			nullChecker(password, setPassword);
			nullChecker(confirmPassword, setConfirmPassword);

			if (email === null) {
				setEmail("");
			} else {
				if (validEmail === null) setValidEmail(false);
				if (ifValidEmail(email)) setValidEmail(true);
			}
			e.preventDefault();
		}
	};

	const ifValidEmail = email => {
		if (/^[a-zA-Z0-9-.-_]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) return true;
		return false;
	};

	const nullChecker = (data, callBackk) => {
		return data === null ? callBackk("") : false;
	};

	const checkPassword = e => {
		setConfirmPassword(e.target.value);
		if (e.target.value === password) setMatchPassword(true);
		else setMatchPassword(false);
	};
	const passwordInput = (val, setMatchPassword) => {
		setPassword(val);
		if (confirmPassword === val) setMatchPassword(true);
		else setMatchPassword(false);
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
							Sign Up
						</Typography>
						<form className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										error={username !== "" ? false : true}
										helperText={
											username !== "" ? false : "This field is required!"
										}
										variant="outlined"
										required
										fullWidth
										id="username"
										label="Username"
										name="username"
										autoComplete="username"
										onChange={e => setUsername(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										error={firstname !== "" ? false : true}
										helperText={
											firstname !== "" ? false : "This field is required!"
										}
										autoComplete="fname"
										name="firstName"
										variant="outlined"
										required
										fullWidth
										id="firstName"
										label="First Name"
										autoFocus
										onChange={e => setFirstName(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										error={lastname !== "" ? false : true}
										helperText={
											lastname !== "" ? false : "This field is required!"
										}
										variant="outlined"
										required
										fullWidth
										id="lastName"
										label="Last Name"
										name="lastName"
										autoComplete="lname"
										onChange={e => setLastName(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										error={validEmail === false || email === "" ? true : false}
										helperText={
											email !== ""
												? validEmail === false
													? "Invalid email format!"
													: false
												: "This field is required"
										}
										variant="outlined"
										required
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
										onChange={e => setEmail(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										error={password !== "" ? false : true}
										helperText={
											password !== "" ? false : "This field is required!"
										}
										variant="outlined"
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="current-password"
										onChange={e =>
											passwordInput(e.target.value, setMatchPassword)
										}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										error={
											confirmPassword !== ""
												? matchPassword
													? false
													: true
												: true
										}
										helperText={
											confirmPassword !== ""
												? matchPassword
													? null
													: "Password do not match!"
												: "This field is required!"
										}
										variant="outlined"
										required
										fullWidth
										name="password"
										label="Confirm Password"
										type="password"
										id="confirmpassword"
										autoComplete="current-password"
										onChange={e => checkPassword(e)}
									/>
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={e => auth(e)}
							>
								Sign up
							</Button>
							<Grid container justify="flex-start">
								<Grid item>
									<Link to="/login" className={classes.act}>
										Already have an account? Sign in
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
