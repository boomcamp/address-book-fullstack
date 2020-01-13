export default function validateLogin(values) {
	let errors = {};
	if (!values.firstname) {
		errors.firstname = 'First Name is required';
	}
	if (!values.lastname) {
		errors.lastname = 'Last Name is required';
	}
	if (!values.username) {
		errors.username = 'Username is required';
	}
	if (!values.email) {
		errors.email = 'Email Address is required';
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
		errors.email = 'Email address is invalid';
	}
	if (!values.password) {
		errors.password = 'Password is required';
	} else if (values.password.length < 10) {
		errors.password = 'Password needs to be more than 10 characters';
	}
	return errors;
}
