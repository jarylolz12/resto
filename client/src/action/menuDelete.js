import axios from 'axios';
import { setAlert } from './alert';
import { DELETE_MENU, DELETE_MENU_FAIL } from './types';

export const actFetchDelete = (id) => async (dispatch) => {
	try {
		const res = axios.delete(`/menu/${id}/del`);
		dispatch({
			type: DELETE_MENU,
			payload: res.data
		});

		dispatch(setAlert('Menu Deleted', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: DELETE_MENU_FAIL
		});
	}
};
