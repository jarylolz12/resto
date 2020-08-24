import {
	UPDATEMENU_FETCH,
	UPDATEMENU_SAVE,
	UPDATEMENU_FETCH_FAIL,
	UPDATEMENU_SAVE_FAIL,
	UPDATE_MENU_FLUSH
} from '../action/types';

const initialState = {
	menuFetch: null,
	isLoaded: false,
	updatedMenu: {},
	isUpdated: false
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case UPDATEMENU_FETCH:
			return {
				...state,
				menuFetch: payload,
				isLoaded: true,
				isUpdated: false
			};
		case UPDATEMENU_SAVE:
			return {
				...state,
				updatedMenu: payload,
				isLoaded: true,
				isUpdated: true
			};
		case UPDATE_MENU_FLUSH:
			return {
				menuFetch: {},
				isLoaded: false
			};
		case UPDATEMENU_FETCH_FAIL:
		case UPDATEMENU_SAVE_FAIL:
			return {
				...state,
				isLoaded: true,
				isUpdated: false
			};
		default:
			return state;
	}
}
