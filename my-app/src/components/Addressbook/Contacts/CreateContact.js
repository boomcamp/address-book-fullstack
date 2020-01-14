import axios from 'axios';
import DateToday from '../../DateToday';

export default function CreateContact(newData) {
	const today = DateToday();
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

	const createContact = () => {
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
				date_created: today
			},
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
			}
		}).catch(err => console.log(err));
	};

	return createContact();
}
