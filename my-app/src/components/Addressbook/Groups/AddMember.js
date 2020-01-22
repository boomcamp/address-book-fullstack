import React, { useState } from 'react';
import MaterialTable from 'material-table';
import ContactData from './ContactData';
import axios from 'axios';

import {
	withStyles,
	Dialog,
	IconButton,
	Typography,
	Snackbar
} from '@material-ui/core';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

export default function AddMembers(props) {
	const { rowData, modal, setModal, member, setMembers } = props;
	const [sort] = useState(true);
	const { state } = ContactData(sort, member);
	const [notif, setNotif] = useState(false);
	const handleClose = () => {
		setModal(false);
		setNotif(false);
	};
	const handleAddMembers = data => {
		let memberArr = [];
		let contactArr = [];

		member.map(mem => {
			if (rowData.id === mem.groupid) {
				return memberArr.push(mem.contactid);
			}
			return null;
		});

		data.map((contact, index) => {
			if (memberArr.indexOf(contact.id) === -1) {
				if (!contactArr.includes(data[index])) {
					contactArr.push(data[index]);
					return axios({
						method: 'post',
						url: '/api/members/create',
						data: {
							userid: localStorage.getItem('id'),
							groupid: rowData.id,
							contactid: contact.id
						},
						headers: {
							Authorization: `Bearer ${JSON.parse(
								localStorage.getItem('token')
							)}`
						}
					})
						.then(res => {
							let arr = member;
							arr.push(res.data);
							setMembers(arr);
							setNotif(true);
						})
						.catch(err => {
							console.log(err);
						});
				}
			}
			return null;
		});
	};

	return (
		<form noValidate>
			<Dialog
				maxWidth="lg"
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={modal}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					{rowData.group_name}
				</DialogTitle>
				<MaterialTable
					title="Contacts"
					columns={state.columns}
					data={state.data}
					options={{
						search: false,
						actionsColumnIndex: -1,
						selection: true,
						actionsCellStyle: {
							width: 1,
							maxWidth: 1
						}
					}}
					actions={[
						{
							tooltip: 'Remove All Selected Users',
							icon: 'add',
							onClick: (evt, data) => {
								handleAddMembers(data);
							}
						}
					]}
				/>
			</Dialog>

			<Snackbar
				open={notif}
				autoHideDuration={500}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert onClose={handleClose} severity={'success'}>
					Successfully added!
				</Alert>
			</Snackbar>
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

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
