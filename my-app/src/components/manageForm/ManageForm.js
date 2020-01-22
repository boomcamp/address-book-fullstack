import { useState } from 'react';

export default function useForm() {
	const [values, setValues] = useState({
		firstname: '',
		lastname: '',
		username: '',
		email: '',
		password: ''
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	return { values, setValues, handleChange };
}
