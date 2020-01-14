import axios from 'axios';

export default function UpdateContact(newData) {
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
	} = newData;
	const updateContact = () => {
		axios({
			method: 'patch',
			url: `/api/contacts/update/${id}`,
			data: {
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
			},
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
			}
		}).catch(err => console.log(err));
	};
	return updateContact();
}
