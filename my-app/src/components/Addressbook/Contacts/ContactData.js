import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContactData() {
	const userId = localStorage.getItem('id');
	const [state, setState] = useState({
		columns: [
			{
				title: 'First Name*',
				field: 'firstname',
				filtering: true
			},
			{
				title: 'Last Name*',
				field: 'lastname',
				filtering: true
			},

			{
				title: 'Mobile Phone (+63)',
				field: 'mobile_phone',
				type: 'numeric'
			}
		],
		data: []
	});

	useEffect(() => {
		axios
			.get(`/api/contacts/userId-${userId}`, {
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

	return { state, setState };
}
