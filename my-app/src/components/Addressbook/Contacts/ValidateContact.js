export default function ValidateContact(values) {
	let errors = {};
	if (!values.firstname) {
		errors.firstname = 'First name is required';
	}

	if (!values.lastname) {
		errors.lastname = 'Last name is required';
	}

	if (!values.home_phone) {
		errors.home_phone = 'Home Phone is required';
	} else if (values.home_phone.charAt(0) !== '9') {
		errors.home_phone = 'First number must be 9';
	} else if (values.home_phone.length !== 10) {
		errors.home_phone = 'Needs to be 11 characters';
	}

	if (!values.mobile_phone) {
		errors.mobile_phone = 'Mobile Phone is required';
	} else if (values.mobile_phone.charAt(0) !== '9') {
		errors.mobile_phone = 'First number must be 9';
	} else if (values.mobile_phone.length !== 10) {
		errors.mobile_phone = 'Needs to be 11 characters';
	}

	if (!values.work_phone) {
		errors.work_phone = 'Work Phone is required';
	} else if (values.work_phone.charAt(0) !== '9') {
		errors.work_phone = 'First number must be 9';
	} else if (values.work_phone.length !== 10) {
		errors.work_phone = 'Needs to be 11 characters';
	}

	if (!values.city) {
		errors.city = 'City is required';
	}

	if (!values.state_or_province) {
		errors.state_or_province = 'State or Province is required';
	}

	if (!values.postal_code) {
		errors.postal_code = 'Postal Code is required';
	}

	if (!values.country) {
		errors.country = 'Country is required';
	}

	if (!values.email) {
		errors.email = 'Email Address is required';
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
		errors.email = 'Email address is invalid';
	}
	return errors;
}
