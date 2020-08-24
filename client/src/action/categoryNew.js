import axios from 'axios';
import { setAlert } from './alert';
import { CATEGORYNEW_SAVE, CATEGORYNEW_FAIL } from './types';

export const actCategoryNew = (mnuCategory) => async (dispatch) => {
	try {
		// const menuCat = { mnuCategory };
		const config = {
			headers: {
				'content-type': 'application/json'
			}
		};

		const res = await axios.post('/categoryNew', mnuCategory, config);
		dispatch({
			type: CATEGORYNEW_SAVE,
			payload: res.data
		});
		dispatch(setAlert(`${res.data.mnuCategory} is added`, 'success'));
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: CATEGORYNEW_FAIL
		});
	}
};
