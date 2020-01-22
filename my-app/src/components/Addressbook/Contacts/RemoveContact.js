import React from 'react';
import axios from 'axios';

import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

export default function RemoveContact(props) {
	const { data, modal, setModal, setNotif } = props;

	const handleClose = () => {
		setModal(false);
	};

	const handelDelete = () => {
		data.forEach(contact => {
			axios
				.delete(`/api/contacts/delete/${contact.id}`, {
					headers: {
						Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
					}
				})
				.catch(err => console.log(err));
		});
		setModal(false);
		setNotif(true);
		setTimeout(() => {
			window.location.reload(true);
		}, 500);
	};

	return (
		<Dialog
			open={modal}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{`You want to delete ${data.length} rows ?`}</DialogTitle>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Disagree
				</Button>
				<Button onClick={handelDelete} color="primary" autoFocus>
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);
}
