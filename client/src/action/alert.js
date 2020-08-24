import uuid from 'uuid/v4';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeOut = 3000) => (dispatch) => {
	// para maka dispatch ka bisag pila ka actiontype gikan sa function
	//pwede ka mag add ug (dispatch) paramenter pero dili ka makaset ug multiple functions
	//so para ma execute nimo ang multiple functions dapat naka install tung thunk nga g install nimo thru npm.
	const id = uuid(); //mag generate lang na siya ug random id. i install ni siya thru npm
	dispatch({
		type: SET_ALERT, //kani para ma execute tung alert nga naa sa types nga same location sa kani nga file/folders
		payload: { msg, alertType, id }
	});

	setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeOut);
};
