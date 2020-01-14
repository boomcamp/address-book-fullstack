export default function ValidateContact(newData) {
	let errors = {};
	if (!newData.firstname) {
		errors.firstname = 'First Name is required';
	}
	if (!newData.lastname) {
		errors.lastname = 'Last Name is required';
	}
	if (!newData.city) {
		errors.city = 'City is required';
	}
	if (!newData.state_or_province) {
		errors.state_or_province = 'State or Province is required';
	}
	if (!newData.postal_code) {
		errors.postal_code = 'Postal Code is required';
	}
	if (!newData.country) {
		errors.country = 'Country is required';
	}
	if (!/\S+@\S+\.\S+/.test(newData.email)) {
		errors.email = 'Email address is invalid';
	}
	return errors;
}
