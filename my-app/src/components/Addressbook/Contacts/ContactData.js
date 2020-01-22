import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContactData(sort) {
	const userId = localStorage.getItem('id');
	const [state, setState] = useState({
		columns: [
			{
				title: 'Name',
				field: 'name'
			},
			{
				title: 'Mobile Phone (+63)',
				field: 'mobile_phone',
				type: 'numeric',
				sorting: false
			}
		],
		data: []
	});

	useEffect(() => {
		axios
			.get(`/api/contacts/userId-${userId}?value=${sort ? 'ASC' : 'DESC'}`, {
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
				}
			})
			.then(res => {
				let arr = [];

				res.data.map(contact => {
					const {
						id,
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
					} = contact;
					arr.push({
						id,
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
						name: `${lastname}, ${firstname}`
					});
					return arr;
				});
				setState(state => {
					return { ...state, data: arr };
				});
			})
			.catch(err => console.log(err));
	}, [sort, userId]);

	return { state, setState };
}
