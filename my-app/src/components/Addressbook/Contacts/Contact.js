import React, { useState } from 'react';
import MaterialTable from 'material-table';

import DateToday from '../../DateToday';
import ContactData from './ContactData';
import CreateContact from './CreateContact';
import UpdateContact from './UpdateContact';
import DeleteContact from './DeleteContact';

import Validate from './ValidateContact';

export default function Contacts() {
	const today = DateToday();
	const { state, setState } = ContactData();
	const [errors, setErrors] = useState({});
	// const [submit, setSubmit] = useState(false);

	return (
		<MaterialTable
			title="Contacts"
			columns={state.columns}
			data={state.data}
			options={{
				filtering: true
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

							setErrors(Validate(newData));
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
									return { ...prevState, data };
								});
							} else {
								alert('Please fill up the required field');
								reject();
							}
						}, 600);
					}),
				onRowUpdate: (newData, oldData) =>
					new Promise((resolve, reject) => {
						setTimeout(() => {
							setErrors(Validate(newData));
							if (Object.keys(Validate(newData)).length === 0) {
								resolve();
								if (oldData) {
									setState(prevState => {
										const data = [...prevState.data];
										data[data.indexOf(oldData)] = newData;
										UpdateContact(newData, oldData);
										return { ...prevState, data };
									});
								}
							} else {
								alert('Please fill up the required field');
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
								return { ...prevState, data };
							});
						}, 600);
					})
			}}
		/>
	);
}
