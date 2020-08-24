import axios from 'axios';
import { setAlert } from './alert';
import { MENU_FETCH, MENU_FAIL } from './types';

export const actMenu = () => async (dispatch) => {
	try {
		const res = await axios.get('/menu');
		dispatch({
			type: MENU_FETCH,
			payload: res.data
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({ type: MENU_FAIL });
	}
};
