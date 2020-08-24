import axios from 'axios';
import { setAlert } from './alert';
import { MENUNEW_SAVE, MENUNEW_FAIL } from './types';

export const actMenuNew = ({ mnuName, mnuCategory, mnuPrice }) => async (dispatch) => {
	const menuItems = {
		mnuName,
		mnuCategory,
		mnuPrice
	};

	try {
		const config = {
			headers: {
				'content-type': 'application/json'
			}
		};

		const body = JSON.stringify(menuItems);

		const res = await axios.post('/menuNew', body, config);
		dispatch({
			type: MENUNEW_SAVE,
			payload: res.data
		});

		dispatch(setAlert(`${mnuName} is added`, 'success'));
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({ type: MENUNEW_FAIL });
	}
};
