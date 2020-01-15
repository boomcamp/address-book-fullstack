import React, { useState } from 'react';
import MaterialTable from 'material-table';

import DateToday from '../../DateToday';
import ContactData from './ContactData';
import CreateContact from './CreateContact';
import UpdateContact from './UpdateContact';
import DeleteContact from './DeleteContact';
import Validate from './ValidateContact';

import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

export default function Contacts() {
	const today = DateToday();
	const { state, setState } = ContactData();
	const [error, setError] = useState(false);
	const [notif, setNotif] = useState('');

	//Notificaton
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<MaterialTable
				title="Contacts"
				columns={state.columns}
				data={state.data}
				options={{
					filtering: true,
					actionsColumnIndex: -1
				}}
				editable={{
					onRowAdd: newData =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								const {
									firstname,
									lastname,
									home_phone,
									mobile_phone,
									work_phone,
									email,
									city,
									state_or_province,
									postal_code,
									country
								} = newData;

								if (Object.keys(Validate(newData)).length === 0) {
									resolve();
									setState(prevState => {
										const data = [...prevState.data];
										data.push({
											firstname,
											lastname,
											home_phone,
											mobile_phone,
											work_phone,
											email,
											city,
											state_or_province,
											postal_code,
											country,
											date_created: today
										});
										CreateContact(newData);

										setNotif('Successfully created');
										setError(false);
										setOpen(true);
										return { ...prevState, data };
									});
								} else {
									if (Validate(newData)) {
										if (Validate(newData).email) {
											setNotif('Required field and invalid email');
										} else {
											setNotif('Please fill up the required field');
										}
									}
									setError(true);
									setOpen(true);
									reject();
								}
							}, 600);
						}),
					onRowUpdate: (newData, oldData) =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								if (Object.keys(Validate(newData)).length === 0) {
									resolve();
									if (oldData) {
										setState(prevState => {
											const data = [...prevState.data];
											data[data.indexOf(oldData)] = newData;

											UpdateContact(newData, oldData);

											setNotif('Successfully updated');
											setError(false);
											setOpen(true);
											return { ...prevState, data };
										});
									}
								} else {
									if (Validate(newData)) {
										if (Validate(newData).email) {
											setNotif('Required field and invalid email');
										} else {
											setNotif('Please fill up the required field');
										}
									}
									setError(true);
									setOpen(true);
									reject();
								}
							}, 600);
						}),
					onRowDelete: oldData =>
						new Promise(resolve => {
							setTimeout(() => {
								resolve();
								setState(prevState => {
									const data = [...prevState.data];
									data.splice(data.indexOf(oldData), 1);
									DeleteContact(oldData);

									setNotif('Successfully removed');
									setError(false);
									setOpen(true);
									return { ...prevState, data };
								});
							}, 600);
						})
				}}
			/>
			<Snackbar
				open={open}
				autoHideDuration={2000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert onClose={handleClose} severity={error ? 'error' : 'success'}>
					{notif}
				</Alert>
			</Snackbar>
		</React.Fragment>
	);
}

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
