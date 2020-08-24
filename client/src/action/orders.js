import axios from 'axios';
import { ORDER_FETCH, ORDER_FAIL } from './types';
import { setAlert } from './alert';
import { saveAs } from 'file-saver';

export const ordersFetch = (orders) => async (dispatch) => {
	try {
		dispatch({
			type: ORDER_FETCH,
			payload: [ ...orders ]
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
		}

		dispatch({
			type: ORDER_FAIL
		});
	}
};

export const ordersSave = (confirmOrders) => async (dispatch) => {
	try {
		dispatch(setAlert('Generating Claim Stub, this may take a while please wait.', 'success'));
		const config = {
			headers: {
				'content-type': 'application/json'
			}
		};
		const body = JSON.stringify(confirmOrders);
		await axios
			.post('/takeOrders', body, config)
			//para i fetch ang PDF na g create sa server
			.then(() => axios.get('/fetchStub', { responseType: 'blob' }))
			.then((res) => {
				const pdfBlob = new Blob([ res.data ], { type: 'application/pdf' });
				saveAs(pdfBlob, 'orders.pdf');
			});

		dispatch(setAlert('Stub has been downloaded. Use it to claim your orders thank you', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({ type: ORDER_FAIL });
	}
};
