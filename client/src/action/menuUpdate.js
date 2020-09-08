import axios from 'axios';
import { setAlert } from './alert';
import {
	UPDATEMENU_FETCH,
	UPDATEMENU_SAVE,
	UPDATEMENU_FETCH_FAIL,
	UPDATEMENU_SAVE_FAIL,
	UPDATE_MENU_FLUSH
} from './types';

export const actFetchUpdate = (id) => async (dispatch) => {
	try {
		if (id.id === '') {
			return;
		}
		const res = await axios.get(`/menu/${id}`);
		dispatch({
			type: UPDATEMENU_FETCH,
			payload: res.data
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({ type: UPDATEMENU_FETCH_FAIL });
	}
};

export const actMenuUpdate = (newUpdate) => async (dispatch) => {
	const { mnuName, mnuCategory, mnuPrice, id } = newUpdate;

	const toBeUpdated = {
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

		const body = JSON.stringify(toBeUpdated);

		const res = await axios.put(`/menu/${id}/updt`, body, config);

		dispatch({
			type: UPDATEMENU_SAVE,
			payload: res.data
		});

		//mao na ni ang solution
		// dispatch({
		// 	type: UPDATE_MENU_FLUSH
		// });

		dispatch(setAlert('Menu Updated', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({ type: UPDATEMENU_SAVE_FAIL });
	}
};

export const updateFetchFlush = () => async (dispatch) => {
	dispatch({
		type: UPDATE_MENU_FLUSH
	});
};
