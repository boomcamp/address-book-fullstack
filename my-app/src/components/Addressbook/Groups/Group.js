import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import DateToday from '../../DateToday';
import ContactPerGroup from './ContactPerGroup';

export default function Group() {
	const userId = localStorage.getItem('id');
	const today = DateToday();

	//Notificaton
	const [error, setError] = useState(false);
	const [notif, setNotif] = useState('');
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	const [state, setState] = useState({
		columns: [
			{ title: 'Group Name', field: 'group_name' },
			{ title: 'Date Created', field: 'date_created', editable: 'never' }
		],
		data: []
	});

	useEffect(() => {
		axios
			.get(`/api/groups/userId-${userId}`, {
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
				}
			})
			.then(res => {
				setState(state => {
					return { ...state, data: res.data };
				});
			})
			.catch(err => console.log(err));
	}, [userId]);
	return (
		<React.Fragment>
			<MaterialTable
				title="Groups"
				columns={state.columns}
				data={state.data}
				detailPanel={rowData => {
					return <ContactPerGroup rowData={rowData} />;
				}}
				options={{
					search: true,
					actionsColumnIndex: -1
				}}
				onRowClick={(event, rowData, togglePanel) => togglePanel()}
				editable={{
					onRowAdd: newData =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								const { group_name } = newData;
								if (group_name) {
									resolve();
									setState(prevState => {
										const data = [...prevState.data];
										data.push({ group_name, date_created: today });
										axios({
											method: 'post',
											url: '/api/groups/create',
											data: {
												userId: localStorage.getItem('id'),
												group_name,
												date_created: today
											},
											headers: {
												Authorization: `Bearer ${JSON.parse(
													localStorage.getItem('token')
												)}`
											}
										})
											.then(res => {
												setNotif('Successfully created');
												setError(false);
												setOpen(true);
											})
											.catch(err => console.log(err));
										return { ...prevState, data };
									});
								} else {
									setNotif('Please fill up the required field');
									setError(true);
									setOpen(true);
									reject();
								}
							}, 600);
						}),
					onRowUpdate: (newData, oldData) =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								const { id, group_name } = newData;
								if (group_name) {
									resolve();
									if (oldData) {
										setState(prevState => {
											const data = [...prevState.data];
											data[data.indexOf(oldData)] = newData;
											axios({
												method: 'patch',
												url: `/api/groups/update/${id}`,
												data: { group_name },
												headers: {
													Authorization: `Bearer ${JSON.parse(
														localStorage.getItem('token')
													)}`
												}
											})
												.then(res => {
													setNotif('Successfully updated');
													setError(false);
													setOpen(true);
												})
												.catch(err => console.log(err));
											return { ...prevState, data };
										});
									}
								} else {
									setNotif('Please fill up the required field');
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
									axios
										.delete(`/api/groups/delete/${oldData.id}`, {
											headers: {
												Authorization: `Bearer ${JSON.parse(
													localStorage.getItem('token')
												)}`
											}
										})
										.then(res => {
											setNotif('Successfully removed');
											setError(false);
											setOpen(true);
										})
										.catch(err => console.log(err));
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
