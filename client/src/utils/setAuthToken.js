import axios from 'axios';

//pag human login sa user, mag send ang backend ug token, nya store nimo siya sa headers
const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
};

export default setAuthToken;
