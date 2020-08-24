import { ORDER_FETCH, ORDER_FAIL } from '../action/types';
const initialState = {
	ordersFetch: JSON.parse(sessionStorage.getItem('orders')),
	isLoaded: false,
	orderCount: 0,
	overallTotal: 0
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case ORDER_FETCH:
			return {
				...state,
				ordersFetch: payload,
				isLoaded: true,
				orderCount: payload.reduce((sum, items) => sum + items.qty, 0)
			};

		case ORDER_FAIL:
			return {
				...state,
				ordersFetch: [],
				orderCount: 0,
				isLoaded: false
			};
		default:
			return state;
	}
}
