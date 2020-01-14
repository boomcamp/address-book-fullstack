import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Logout(props) {
	const [open, setOpen] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleLogOut = () => {
		localStorage.removeItem('name');
		localStorage.removeItem('token');
		localStorage.setItem('notif', 'Successfully log out');
		setRedirect(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	if (redirect) {
		return <Redirect to="/" />;
	} else {
		return (
			<React.Fragment>
				<Button color="inherit" onClick={handleClickOpen}>
					Logout
				</Button>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{'LOG OUT'}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure you want to log out?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleLogOut} color="primary">
							Confirm
						</Button>
						<Button onClick={handleClose} color="secondary" autoFocus>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			</React.Fragment>
		);
	}
}
