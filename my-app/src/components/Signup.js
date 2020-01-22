import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ManageForm from './manageForm/ManageForm';
import Validate from './manageForm/Validate';

import {
	makeStyles,
	Avatar,
	Button,
	Box,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	Container
} from '@material-ui/core';

export default function Signup(props) {
	const classes = useStyles();

	const [data, setData] = useState([]);
	const [errors, setErrors] = useState({});
	const [submit, setSubmit] = useState(false);
	const { values, setValues, handleChange } = ManageForm();

	const handleSubmit = e => {
		e.preventDefault();
		setErrors(Validate(values, data, 'signup'));
		setSubmit(true);
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			props.history.push('/users');
		}

		axios
			.get(`/api/users`)
			.then(res => {
				setData(res.data);
			})
			.catch(err => {
				console.log(err);
			});

		const { firstname, lastname, username, email, password } = values;

		if (Object.keys(errors).length === 0 && submit) {
			axios({
				method: 'post',
				url: '/api/users/create',
				data: {
					firstname,
					lastname,
					username,
					email,
					password
				}
			})
				.then(res => {
					localStorage.setItem('token', JSON.stringify(res.data.token));
					localStorage.setItem('id', res.data.id);
					localStorage.setItem('name', res.data.firstname);
					localStorage.setItem(
						'notif',
						JSON.stringify('Succesfully Logged In.')
					);
					props.history.push('/users');
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, [errors, submit, props.history, values, setValues]);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstname"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								value={values.firstname}
								onChange={handleChange}
								error={errors.firstname ? true : false}
								helperText={errors.firstname && errors.firstname}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastname"
								autoComplete="lname"
								value={values.lastname}
								onChange={handleChange}
								error={errors.lastname ? true : false}
								helperText={errors.lastname && errors.lastname}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								value={values.username}
								onChange={handleChange}
								error={errors.username ? true : false}
								helperText={errors.lastname && errors.username}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								value={values.email}
								onChange={handleChange}
								error={errors.email ? true : false}
								helperText={errors.email && errors.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={values.password}
								onChange={handleChange}
								error={errors.password ? true : false}
								helperText={errors.password && errors.password}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justify="center">
						<Grid item>
							<Link to="/signin" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}Address Book {new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));
