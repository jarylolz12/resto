import { MENU_FETCH, MENU_FAIL } from '../action/types';

const initialState = null;

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case MENU_FETCH:
			return payload;
		case MENU_FAIL:
			return state;
		default:
			return state;
	}
}
