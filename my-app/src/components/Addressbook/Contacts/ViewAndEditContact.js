import React, { useState } from 'react';
import axios from 'axios';
import Validate from './ValidateContact';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

const DialogTitle = withStyles(styles)(props => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing(2)
	}
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(1)
	}
}))(MuiDialogActions);

export default function ViewAndEditContact(props) {
	const { data, setData, modal } = props;
	const [edit, setEdit] = useState(true);
	const [errors, setErrors] = useState({});

	const handleChange = e => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};
	const handleClose = () => {
		window.location.reload(true);
	};
	const handleEdit = () => {
		setEdit(!edit);
	};
	const handleSubmit = () => {
		setErrors(Validate(data));
		if (Object.keys(Validate(data)).length === 0) {
			axios({
				method: 'patch',
				url: `/api/contacts/update/${data.id}`,
				data: data,
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
				}
			})
				.then(res => {
					props.setNotif(true);
					setEdit(!edit);
					setTimeout(() => {
						window.location.reload(true);
					}, 100);
				})
				.catch(err => console.log(err));
		}
	};

	return (
		<form noValidate>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={modal}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					{`${data.firstname} ${data.lastname} details`}
				</DialogTitle>
				<DialogContent dividers>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoFocus
								margin="dense"
								name="firstname"
								id="firstname"
								label="First Name"
								type="firstname"
								fullWidth
								InputProps={{
									readOnly: edit,
									disableUnderline: edit
								}}
								value={data.firstname}
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
								label="Last Name"
								type="lastname"
								fullWidth
								InputProps={{
									readOnly: edit,
									disableUnderline: edit
								}}
								value={data.lastname}
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
								value={data.home_phone}
								onChange={handleChange}
								error={errors.home_phone ? true : false}
								helperText={errors.home_phone && errors.home_phone}
								InputProps={{
									readOnly: edit,
									disableUnderline: edit,
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
								value={data.mobile_phone}
								onChange={handleChange}
								error={errors.mobile_phone ? true : false}
								helperText={errors.mobile_phone && errors.mobile_phone}
								InputProps={{
									readOnly: edit,
									disableUnderline: edit,
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
								value={data.work_phone}
								onChange={handleChange}
								error={errors.work_phone ? true : false}
								helperText={errors.work_phone && errors.work_phone}
								InputProps={{
									readOnly: edit,
									disableUnderline: edit,
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
								InputProps={{
									readOnly: edit,
									disableUnderline: edit
								}}
								value={data.email}
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
								InputProps={{
									readOnly: edit,
									disableUnderline: edit
								}}
								value={data.city}
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
								InputProps={{
									readOnly: edit,
									disableUnderline: edit
								}}
								value={data.state_or_province}
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
								InputProps={{
									readOnly: edit,
									disableUnderline: edit
								}}
								value={data.postal_code}
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
								InputProps={{
									readOnly: edit,
									disableUnderline: edit
								}}
								value={data.country}
								onChange={handleChange}
								error={errors.country ? true : false}
								helperText={errors.country && errors.country}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					{!edit ? (
						<React.Fragment>
							<Button color="primary" onClick={handleSubmit}>
								Save
							</Button>
							<Button color="primary" onClick={handleEdit}>
								Cancel
							</Button>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Button color="primary" onClick={handleEdit}>
								Update
							</Button>
							<Button onClick={handleClose} color="primary">
								Close
							</Button>
						</React.Fragment>
					)}
				</DialogActions>
			</Dialog>
		</form>
	);
}
