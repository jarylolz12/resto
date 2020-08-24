import { DELETE_MENU, DELETE_MENU_FAIL } from '../action/types';

const initialState = {
	menuFetch: '',
	isLoaded: false,
	isDeleted: false
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case DELETE_MENU:
			return {
				...state,
				menuFetch: payload,
				isLoaded: true
			};
		case DELETE_MENU_FAIL:
			return {
				...state,
				menuFetch: '',
				isLoaded: false,
				isDeleted: false
			};
		default:
			return state;
	}
}
