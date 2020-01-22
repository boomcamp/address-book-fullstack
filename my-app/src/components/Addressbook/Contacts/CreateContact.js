import React, { useState } from 'react';
import axios from 'axios';
import Validate from './ValidateContact';
import DateToday from '../../DateToday';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CreateContact(props) {
	const today = DateToday();
	const [values, setValues] = useState({
		userid: localStorage.getItem('id'),
		firstname: '',
		lastname: '',
		home_phone: '',
		mobile_phone: '',
		work_phone: '',
		email: '',
		city: '',
		state_or_province: '',
		postal_code: '',
		country: '',
		name: '',
		date_created: today
	});
	const [errors, setErrors] = useState({});

	const handleChange = e => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
			name: `${values.lastname}, ${values.firstname}`
		});
	};
	const handleClose = () => {
		window.location.reload(true);
	};
	const handleSubmit = () => {
		setErrors(Validate(values));
		props.setState(prevState => {
			const data = [...prevState.data];
			data.push(values);
			return { ...prevState, data };
		});

		if (Object.keys(Validate(values)).length === 0) {
			axios({
				method: 'post',
				url: '/api/contacts/create',
				data: values,
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
				}
			})
				.then(res => {
					setValues({
						userid: localStorage.getItem('id'),
						firstname: '',
						lastname: '',
						home_phone: '',
						mobile_phone: '',
						work_phone: '',
						email: '',
						city: '',
						state_or_province: '',
						postal_code: '',
						country: '',
						date_created: today
					});

					props.setNotif(true);
				})
				.catch(err => {
					console.log(err);
				});
		}
	};

	return (
		<form noValidate>
			<Dialog
				disableBackdropClick
				disableEscapeKeyDown
				open={props.createModal}
				maxWidth={'sm'}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Add Contacts</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoFocus
								margin="dense"
								name="firstname"
								id="firstname"
								label="First Name*"
								type="firstname"
								fullWidth
								value={values.firstname}
								onChange={handleChange}
								error={errors.firstname ? true : false}
								helperText={errors.firstname && errors.firstname}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoFocus
								margin="dense"
								name="lastname"
								id="lastname"
								label="Last Name*"
								type="lastname"
								fullWidth
								value={values.lastname}
								onChange={handleChange}
								error={errors.lastname ? true : false}
								helperText={errors.lastname && errors.lastname}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								autoFocus
								margin="dense"
								name="home_phone"
								id="home_phone"
								label="Home Phone"
								fullWidth
								type="number"
								value={values.home_phone}
								onChange={handleChange}
								error={errors.home_phone ? true : false}
								helperText={errors.home_phone && errors.home_phone}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">+63</InputAdornment>
									)
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								autoFocus
								margin="dense"
								name="mobile_phone"
								id="mobile_phone"
								label="Mobile Phone"
								fullWidth
								type="number"
								value={values.mobile_phone}
								onChange={handleChange}
								error={errors.mobile_phone ? true : false}
								helperText={errors.mobile_phone && errors.mobile_phone}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">+63</InputAdornment>
									)
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								autoFocus
								margin="dense"
								name="work_phone"
								id="work_phone"
								label="Work Phone"
								fullWidth
								type="number"
								maxLength="2"
								value={values.work_phone}
								onChange={handleChange}
								error={errors.work_phone ? true : false}
								helperText={errors.work_phone && errors.work_phone}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">+63</InputAdornment>
									)
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								autoFocus
								margin="dense"
								name="email"
								id="email"
								label="Email Address"
								type="email"
								fullWidth
								value={values.email}
								onChange={handleChange}
								error={errors.email ? true : false}
								helperText={errors.email && errors.email}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoFocus
								margin="dense"
								name="city"
								id="city"
								label="City"
								type="city"
								fullWidth
								value={values.city}
								onChange={handleChange}
								error={errors.city ? true : false}
								helperText={errors.city && errors.city}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoFocus
								margin="dense"
								name="state_or_province"
								id="state_or_province"
								label="State/Province"
								type="state_or_province"
								fullWidth
								value={values.state_or_province}
								onChange={handleChange}
								error={errors.state_or_province ? true : false}
								helperText={
									errors.state_or_province && errors.state_or_province
								}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoFocus
								margin="dense"
								name="postal_code"
								id="postal_code"
								label="Postal Code"
								type="number"
								fullWidth
								value={values.postal_code}
								onChange={handleChange}
								error={errors.postal_code ? true : false}
								helperText={errors.postal_code && errors.postal_code}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoFocus
								margin="dense"
								name="country"
								id="country"
								label="Country"
								type="country"
								fullWidth
								value={values.country}
								onChange={handleChange}
								error={errors.country ? true : false}
								helperText={errors.country && errors.country}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button color="primary" onClick={handleSubmit}>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</form>
	);
}
