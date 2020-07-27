import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOAD, LOG_OUT } from '../action/types';

//himo kag default state para sa imong redux
//kailangan ni siya kay immutable ang state. mura ni siyag temporary state.
const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: {},
	isGuest: false
}; //himo kag bagong object sa state ug "isAdmin", i deconstruct ang payload para ma extract nimo ang
//isAdmin nya ibutang siya sa is admin nga bagong state na imong g declare

//himo kag function para muhandle sa imong temporary state.
export default function(state = initialState, action) {
	const { type, payload } = action;
	//const { token, isAdmin, staffLvl, _id, name } = payload;
	switch (type) { //pag success imong credentials mao ni ang result
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token); //store niya ang token sa user nga nag login.
			return {
				...state,
				...payload,
				isAuthenticated: true, //i set ang temporary state base sa i return.
				loading: false
			};

		case USER_LOAD:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload
			};

		//store ang user info nga nakalogin base sa token nga g send sa backend.
		case LOGIN_FAIL:
		case LOG_OUT: //otherwise delete niya token nya set niya ang parameters sa initial state
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: true,
				user: ''
			};

		default:
			return state;
	}
}
