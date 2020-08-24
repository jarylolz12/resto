import { CATEGORYNEW_SAVE, CATEGORYNEW_FAIL } from '../action/types';

const initialState = { isSaved: false };

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CATEGORYNEW_SAVE:
			return {
				...state,
				menu: payload,
				isSaved: true
			};
		case CATEGORYNEW_FAIL:
			return { isSaved: false };
		default:
			return state;
	}
}
