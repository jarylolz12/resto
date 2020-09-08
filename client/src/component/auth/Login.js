import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { actLogin } from '../../action/login';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

//-------------------------------------------
//formData kay murag >> state = {
//  formData:{
//  (object nga gusto nimo isulod dire)
// }
//  }

//SetFormData kay murag >> this.setFormData = (pasa nimo mga values sa body content)
//i load ang isAuthenticated dire para mugana
const Login = ({ actLogin, isAuthenticated }) => {
	const [ formData, setFormData ] = useState({
		//set nimo ang datastructure if naa kay schema (formData)
		email: '',
		password: ''
	});

	//deconstruct para dili ka mag sige ug formData.(parameters)
	const { email, password } = formData;

	if (isAuthenticated) {
		return <Redirect to="/staffMenu" />;
	}

	//event handler/function para dynamically ma set/fetch nimo ang values sa textfields
	//labay ang data nga na fetch nimo ddto sa formData sa taas
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value }); //gamiti ug (...) spread operator para i copy kung unsa naa sa value;
	const onSubmit = async (e) => {
		e.preventDefault();
		actLogin({ email, password });
	};
	//authentication handler

	return (
		<Fragment>
			<div className="form-global">
				<h2>Login</h2>
				<form onSubmit={(e) => onSubmit(e)}>
					<div className="form-family">
						<input
							type="text"
							name="email"
							placeholder="Email"
							value={email} //equivalent data sila sa formdata nga imong g deconstruct sa taas
							onChange={(e) => onChange(e)} //himo kag event handler/function para ma set/fetch nimo ang values sa textfield paadto sa empty object nga formData sa taas.
							//i handle sa nimo ang event para maka type ka sa textfield
						/>
					</div>
					<div className="form-family">
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={password}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<input type="submit" value="Submit" className="btn-wrapper dark" />
				</form>
			</div>
		</Fragment>
	);
};

Login.propTypes = {
	actLogin: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

//map ang initalstate nga naay object na isAuthenticated
//nya ibutang siya sa proptypes human ibtang siya sa parameter sa taas
const mapStateToProps = (state) => ({
	isAuthenticated: state.login.isAuthenticated
});

export default connect(mapStateToProps, { actLogin })(Login); //ayaw ni i delete

//pwede ka makapasa ug data without redux
// const loginCredentials = {
//     email,
//     password
// };

// try {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//     const body = JSON.stringify(loginCredentials);

//     const res = await axios.post('/login', body, config);
//     console.log(res.data);
// } catch (err) {
//     console.error(err.respose.data);
// }
