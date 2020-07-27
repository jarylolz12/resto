import { ORDERS_STAFF_FETCH, ORDERS_STAFF_FAIL, ORDERS_STAFF_UPDATE } from '../action/types';
const initialState = {
	orders: null,
	isLoaded: false,
	updateData: {},
	isUpdate: false
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case ORDERS_STAFF_FETCH:
			return {
				...state,
				orders: payload,
				isLoaded: true
			};
		case ORDERS_STAFF_FAIL:
			return {
				...state,
				orders: [],
				isLoaded: false
			};
		case ORDERS_STAFF_UPDATE:
			return {
				...state,
				isUpdate: true,
				updateData: { ...payload }
			};
		default:
			return state;
	}
}
