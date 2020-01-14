import axios from 'axios';

export default function DeleteContact(oldData) {
	const deleteContact = () => {
		axios
			.delete(`/api/contacts/delete/${oldData.id}`, {
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
				}
			})
			.catch(err => console.log(err));
	};

	return deleteContact();
}
