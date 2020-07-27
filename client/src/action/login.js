import axios from 'axios';
import { setAlert } from './alert';
import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOAD, LOG_OUT } from './types';
import setAuthToken from '../utils/setAuthToken';

export const actLogin = ({ email, password }) => async (dispatch) => {
	//declare kag ug default object para sa imong credentials
	const loginCredentials = {
		email,
		password
	};

	//himo kag object base sa headers na gusto nimo i set, tan awa tung sa postman
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		//himoon json object ang data
		const body = JSON.stringify(loginCredentials); //converto to json tung credetials nimo sa taas

		//tawagon ang post route na login sa backend server (nodejs) para ma fetch ang data.
		const res = await axios.post('/login', body, config); //tawagon sa axios ang server side para i compare ang data
		//i store ang data nga imong g fetch nga data gikan sa axios paadto ddito sa redux state nga imong g set

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		//handler para pag naay unod imong token
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		//pag naay unod imong token, fetch niya ang data nga naka query sa backend.
		//pag walay token (id) mag error ang server
		const response = await axios.get('/auth');
		console.log(response.data);
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

		dispatch({
			type: USER_LOAD,
			payload: res.data
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
			dispatch({ type: LOGIN_FAIL });
		}

		//pag true ang is guest dapat is guest iyang i execute othewise lginfail
	}
};

export const logOut = () => (dispatch) => {
	dispatch({ type: LOG_OUT });
};
