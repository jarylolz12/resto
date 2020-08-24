import { SET_ALERT, REMOVE_ALERT } from '../action/types';

const initialState = []; //create kag initial state para butangan uug objects para sa alert

//himo kag function (para sa action)
export default function(state = initialState, action) {
	const { type, payload } = action;
	//evaluate ang type gamit ang switch statement with case
	//himo kag folder named "actions" nya create kag file named "types.js" para sa action.type
	switch (type) {
		case SET_ALERT:
			return [ ...state, payload ];
		case REMOVE_ALERT:
			return state.filter((alert) => alert.id !== payload); //fetch niya tanan payload base sa naka filter na condition
		default:
			return state;
	}
}
