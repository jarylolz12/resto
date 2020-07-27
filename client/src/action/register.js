import axios from 'axios';
import { setAlert } from './alert';

export const actRegister = ({ name, email, password }) => async (dispatch) => {
	const registerInfo = {
		name,
		email,
		password
	};

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const body = JSON.stringify(registerInfo);
		const res = await axios.post('/register', body, config);
		dispatch(setAlert(res.data.name + ' Succesfully Registered', 'sucess'));
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		} else {
		}
	}
};
