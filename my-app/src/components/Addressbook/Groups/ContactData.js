import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContactData(sort, member) {
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
				let memberArr = [];
				let contactArr = [];

				member.map(mem => {
					return memberArr.push(mem.contactid);
				});

				res.data.map((contact, index) => {
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
					if (memberArr.indexOf(contact.id) === -1) {
						if (!contactArr.includes(res.data[index])) {
							contactArr.push(res.data[index]);
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
						}
					}
					return arr;
				});
				setState(state => {
					return { ...state, data: arr };
				});
			})
			.catch(err => console.log(err));
	}, [member, sort, userId]);

	return { state, setState };
}
