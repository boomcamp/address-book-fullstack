import React from 'react';
import axios from 'axios';
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	Snackbar
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

export default function RemoveMember(props) {
	const { data, modal, setModal, member, setMembers } = props;
	const [notif, setNotif] = React.useState(false);

	const handleClose = () => {
		setModal(false);
		setNotif(false);
	};

	const handelDelete = () => {
		axios
			.delete(`/api/members/delete/${data}`, {
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
				}
			})
			.then(res => {
				setModal(false);
				setNotif(true);
				let arr = member;

				arr.map((mem, index) => {
					if (mem.id === res.data.id) {
						arr.splice(index, 1);
					}
					return arr;
				});
				setMembers(arr);
			})
			.catch(err => console.log(err));
	};

	return (
		<React.Fragment>
			<Dialog
				open={modal}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{`Are you sure you want to delete member?`}</DialogTitle>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Disagree
					</Button>
					<Button onClick={handelDelete} color="primary" autoFocus>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={notif}
				autoHideDuration={2000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert onClose={handleClose} severity={'success'}>
					Successfully removed!
				</Alert>
			</Snackbar>
		</React.Fragment>
	);
}

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
