import axios from 'axios';
import { setAlert } from './alert';
import { CATEGORY_FETCH, CATEGORY_FAIL } from './types';

export const actCategory = () => async (dispatch) => {
	try {
		const res = await axios.get('/category');

		dispatch({
			type: CATEGORY_FETCH,
			payload: res.data
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({ type: CATEGORY_FAIL });
	}
};
