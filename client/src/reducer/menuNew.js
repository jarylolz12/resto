import { MENUNEW_SAVE, MENUNEW_FAIL } from '../action/types';

const initialState = { isSaved: false };

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case MENUNEW_SAVE:
			return {
				...state,
				menu: payload,
				isSaved: true
			};
		case MENUNEW_FAIL:
			return { ...state, isSaved: false };
		default:
			return state;
	}
}
