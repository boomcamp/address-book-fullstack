import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ManageForm from './manageForm/ManageForm';
import Validate from './manageForm/Validate';

import {
	makeStyles,
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Box,
	Typography,
	Container,
	Snackbar
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

export default function SignIn(props) {
	const classes = useStyles();

	const [errors, setErrors] = useState({});
	const { values, handleChange } = ManageForm();

	//Notificaton
	const [err, setErr] = useState('');
	const [open, setOpen] = useState(false);
	const [invalid, setInvalid] = useState(false);
	const [notif, setNotif] = useState('');

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			props.history.push('/users');
		}
		if (localStorage.getItem('notif')) {
			setNotif(localStorage.getItem('notif'));
			setOpen(true);
			localStorage.removeItem('notif');
		}
	}, [setOpen, props.history]);

	const handleSubmit = e => {
		e.preventDefault();
		setErrors(Validate(values));

		const { username, password } = values;

		if (password && username) {
			axios({
				method: 'post',
				url: '/api/users/login',
				data: {
					username,
					password
				}
			})
				.then(res => {
					if (res.data.error) {
						setErr(res.data.error);
						setOpen(true);
						setInvalid(true);
					} else {
						localStorage.setItem('token', JSON.stringify(res.data.token));
						localStorage.setItem('id', res.data.id);
						localStorage.setItem('name', res.data.firstname);
						localStorage.setItem(
							'notif',
							JSON.stringify('Succesfully Logged In.')
						);
						props.history.push('/users');
					}
				})
				.catch(err => {
					try {
						return { status: err.response.status, data: err.response.data };
					} catch {
						return 500;
					}
				});
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						type="text"
						autoComplete="username"
						autoFocus
						value={values.username}
						onChange={handleChange}
						error={errors.username ? true : false}
						helperText={errors.username && errors.username}
					/>
					<TextField
						variant="outlined"
						margin="normal"
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
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container justify="center">
						<Grid item>
							<Link to="/signup">{"Don't have an account? Sign Up"}</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>

			<Snackbar
				open={open}
				autoHideDuration={1000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert onClose={handleClose} severity={invalid ? 'error' : 'success'}>
					{invalid ? err : notif}
				</Alert>
			</Snackbar>
		</Container>
	);
}

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			Address Book {new Date().getFullYear()}
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
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
