import axios from 'axios';
import { setAlert } from './alert';
import { ORDERS_STAFF_FETCH, ORDERS_STAFF_FAIL, ORDERS_STAFF_UPDATE } from './types';

export const actStaffOrdersData = () => async (dispatch) => {
	try {
		const res = await axios.get('/orders');
		dispatch({
			type: ORDERS_STAFF_FETCH,
			payload: res.data
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: ORDERS_STAFF_FAIL
		});
	}
};

export const actStaffOrderUpdate = (updateData) => async (dispatch) => {
	const { id, status } = updateData;
	try {
		const statusUpdate = {
			status
		};
		const config = {
			headers: {
				'content-type': 'application/json'
			}
		};

		const body = JSON.stringify(statusUpdate);
		const res = await axios.put(`/orders/${id}/updt`, body, config);

		dispatch({
			type: ORDERS_STAFF_UPDATE,
			payload: (await res).data
		});
	} catch (err) {}
};
