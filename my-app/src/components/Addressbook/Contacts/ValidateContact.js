export default function ValidateContact(values) {
	let errors = {};
	if (!values.firstname) {
		errors.firstname = 'First name is required';
	}

	if (!values.lastname) {
		errors.lastname = 'Last name is required';
	}

	if (values.home_phone) {
		if (values.home_phone.charAt(0) !== '9') {
			errors.home_phone = 'First number must be 9';
		} else if (values.home_phone.length !== 10) {
			errors.home_phone = 'Needs to be 11 characters';
		}
	}

	if (values.mobile_phone) {
		if (values.mobile_phone.charAt(0) !== '9') {
			errors.mobile_phone = 'First number must be 9';
		} else if (values.mobile_phone.length !== 10) {
			errors.mobile_phone = 'Needs to be 11 characters';
		}
	}

	if (values.work_phone) {
		if (values.work_phone.charAt(0) !== '9') {
			errors.work_phone = 'First number must be 9';
		} else if (values.work_phone.length !== 10) {
			errors.work_phone = 'Needs to be 11 characters';
		}
	}

	if (values.email) {
		if (!/\S+@\S+\.\S+/.test(values.email)) {
			errors.email = 'Email address is invalid';
		}
	}
	return errors;
}
