import { CATEGORY_FETCH, CATEGORY_FAIL } from '../action/types';

//create ug initialstate
const initialstate = null;

//function para sa state ug payload/action

export default function(state = initialstate, action) {
	//deconnstruct ang actions
	const { type, payload } = action;
	switch (type) {
		case CATEGORY_FETCH:
			return payload;
		case CATEGORY_FAIL:
			return state;
		default:
			return state;
	}
}
