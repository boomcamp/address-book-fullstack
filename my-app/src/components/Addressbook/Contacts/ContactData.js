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
			{ title: 'Last Name*', field: 'lastname', filtering: true },
			{
				title: 'Home Phone',
				field: 'home_phone',
				type: 'numeric',
				filtering: false
			},
			{
				title: 'Mobile Phone',
				field: 'mobile_phone',
				type: 'numeric',
				filtering: false
			},
			{
				title: 'Work Phone',
				field: 'work_phone',
				type: 'numeric',
				filtering: false
			},
			{ title: 'Email', field: 'email', filtering: false },
			{ title: 'City*', field: 'city', filtering: false },
			{
				title: 'State/Province*',
				field: 'state_or_province',
				filtering: false
			},
			{
				title: 'Zip code*',
				field: 'postal_code',
				type: 'numeric',
				filtering: false
			},
			{ title: 'Country*', field: 'country', filtering: false },
			{
				title: 'Date Created',
				field: 'date_created',
				editable: 'never',
				filtering: false
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
