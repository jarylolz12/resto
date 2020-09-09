import axios from 'axios';
import { setAlert } from './alert';
import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOAD, LOG_OUT } from './types';
import setAuthToken from '../utils/setAuthToken';

export const actLogin = ({ email, password }) => async (dispatch) => {
	const loginCredentials = {
		email,
		password
	};

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const body = JSON.stringify(loginCredentials);

		const res = await axios.post('/login', body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		const response = await axios.get('/auth');
		dispatch({
			type: USER_LOAD,
			payload: response.data
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({ type: LOGIN_FAIL });
	}
};

export const loadUser = () => async (dispatch) => {
	try {
		const res = await axios.get('/auth');
		if (res) {
			dispatch({
				type: USER_LOAD,
				payload: res.data
			});
		}
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
			dispatch({ type: LOGIN_FAIL });
		}
	}
};

export const logOut = () => (dispatch) => {
	dispatch({ type: LOG_OUT });
};
