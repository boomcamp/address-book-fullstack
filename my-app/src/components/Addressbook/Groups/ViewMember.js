import React, { useState } from 'react';

import {
	withStyles,
	Button,
	Dialog,
	IconButton,
	Typography,
	Grid,
	TextField,
	InputAdornment
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

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

export default function ViewMember(props) {
	const { data, modal, setModal } = props;
	const [edit] = useState(true);

	const handleClose = () => {
		setModal(false);
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
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</form>
	);
}
