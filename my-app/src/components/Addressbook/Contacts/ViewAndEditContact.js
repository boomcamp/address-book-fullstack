import React, { useState } from 'react';
import axios from 'axios';
import Validate from './ValidateContact';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export default function ViewAndEditContact(props) {
	const { data, setData, modal, setModal } = props;
	const [edit, setEdit] = useState(true);
	const [errors, setErrors] = useState({});

	const handleChange = e => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};
	const handleClose = () => {
		setModal(false);
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
					}, 1000);
				})
				.catch(err => console.log(err));
		}
	};
	return (
		<form noValidate>
			<Dialog
				open={modal}
				maxWidth={'sm'}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<MuiDialogTitle disableTypography>
					<Typography variant="h6">View</Typography>
					<IconButton aria-label="close" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</MuiDialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								autoFocus
								margin="dense"
								name="firstname"
								id="firstname"
								label="First Name"
								type="firstname"
								fullWidth
								disabled={edit}
								value={data.firstname}
								onChange={handleChange}
								error={errors.firstname ? true : false}
								helperText={errors.firstname && errors.firstname}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								autoFocus
								margin="dense"
								name="lastname"
								id="lastname"
								label="Last Name"
								type="lastname"
								fullWidth
								disabled={edit}
								value={data.lastname}
								onChange={handleChange}
								error={errors.lastname ? true : false}
								helperText={errors.lastname && errors.lastname}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								autoFocus
								margin="dense"
								name="home_phone"
								id="home_phone"
								label="Home Phone"
								fullWidth
								type="number"
								disabled={edit}
								value={data.home_phone}
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
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								autoFocus
								margin="dense"
								name="mobile_phone"
								id="mobile_phone"
								label="Mobile Phone"
								fullWidth
								type="number"
								disabled={edit}
								value={data.mobile_phone}
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
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								autoFocus
								margin="dense"
								name="work_phone"
								id="work_phone"
								label="Work Phone"
								fullWidth
								type="number"
								maxLength="2"
								disabled={edit}
								value={data.work_phone}
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
								variant="outlined"
								autoFocus
								margin="dense"
								name="email"
								id="email"
								label="Email Address"
								type="email"
								fullWidth
								disabled={edit}
								value={data.email}
								onChange={handleChange}
								error={errors.email ? true : false}
								helperText={errors.email && errors.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								autoFocus
								margin="dense"
								name="city"
								id="city"
								label="City"
								type="city"
								fullWidth
								disabled={edit}
								value={data.city}
								onChange={handleChange}
								error={errors.city ? true : false}
								helperText={errors.city && errors.city}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								autoFocus
								margin="dense"
								name="state_or_province"
								id="state_or_province"
								label="State/Province"
								type="state_or_province"
								fullWidth
								disabled={edit}
								value={data.state_or_province}
								onChange={handleChange}
								error={errors.state_or_province ? true : false}
								helperText={
									errors.state_or_province && errors.state_or_province
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								autoFocus
								margin="dense"
								name="postal_code"
								id="postal_code"
								label="Postal Code"
								type="number"
								fullWidth
								disabled={edit}
								value={data.postal_code}
								onChange={handleChange}
								error={errors.postal_code ? true : false}
								helperText={errors.postal_code && errors.postal_code}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								autoFocus
								margin="dense"
								name="country"
								id="country"
								label="Country"
								type="country"
								fullWidth
								disabled={edit}
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
