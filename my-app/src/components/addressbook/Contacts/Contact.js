import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

export default function Contacts() {
	const userId = localStorage.getItem('id');

	const [state, setState] = useState({
		columns: [
			{ title: 'First Name', field: 'firstname' },
			{ title: 'Last Name', field: 'lastname' },
			{ title: 'Home Phone', field: 'home_phone' },
			{ title: 'Mobile Phone', field: 'mobile_phone' },
			{ title: 'Work Phone', field: 'work_phone' },
			{ title: 'Email', field: 'email' },
			{ title: 'City', field: 'city' },
			{ title: 'State or Province', field: 'state_or_province' },
			{ title: 'Postal Code', field: 'postal_code' },
			{ title: 'Country', field: 'country' },
			{ title: 'Date Created', field: 'date_created' }
		],
		data: []
	});

	useEffect(() => {
		axios
			.get(`/api/contacts/userId-${userId}`)
			.then(res => {
				setState(state => {
					return { ...state, data: res.data };
				});
			})
			.catch(err => console.log(err));
	}, [userId]);

	return (
		<MaterialTable
			title="Contacts"
			columns={state.columns}
			data={state.data}
			editable={{
				onRowAdd: newData =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve();
							setState(prevState => {
								const data = [...prevState.data];

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
									country,
									date_created
								} = newData;

								// data.push(newData);
								axios({
									method: 'post',
									url: '/api/contacts/create',
									data: {
										userId: localStorage.getItem('id'),
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
										date_created
									}
								})
									.then(res => {
										console.log(res.data);
									})
									.catch(err => {
										console.log(err);
									});
								console.log({
									userId: parseInt(localStorage.getItem('id')),
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
									date_created
								});
								return { ...prevState, data };
							});
						}, 600);
					}),
				onRowUpdate: (newData, oldData) =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve();
							if (oldData) {
								setState(prevState => {
									const data = [...prevState.data];
									data[data.indexOf(oldData)] = newData;
									return { ...prevState, data };
								});
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
								return { ...prevState, data };
							});
						}, 600);
					})
			}}
		/>
	);
}
