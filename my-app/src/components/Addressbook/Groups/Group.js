import React, { useState, useEffect } from 'react';

import axios from 'axios';
import DateToday from '../../DateToday';
import ContactPerGroup from './ContactPerGroup';

import MaterialTable from 'material-table';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

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
		columns: [{ title: 'Group Name', field: 'group_name' }],
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
				options={{
					search: true,
					actionsColumnIndex: -1,
					isFreeAction: true,
					detailPanelType: 'single'
				}}
				detailPanel={rowData => {
					return <ContactPerGroup rowData={rowData} />;
				}}
				onRowClick={(event, rowData, togglePanel) => togglePanel()}
				editable={{
					onRowAdd: newData =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								const { group_name } = newData;
								if (group_name) {
									resolve();
									axios({
										method: 'post',
										url: '/api/groups/create',
										data: {
											userid: localStorage.getItem('id'),
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
											setState(prevState => {
												const data = [...prevState.data];
												data.push(res.data);
												return { ...prevState, data };
											});
										})
										.catch(err => console.log(err));
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
