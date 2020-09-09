import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { actLogin } from '../../action/login';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Login = ({ actLogin, isAuthenticated }) => {
	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	if (isAuthenticated) {
		return <Redirect to="/staffMenu" />;
	}

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value }); //gamiti ug (...) spread operator para i copy kung unsa naa sa value;
	const onSubmit = async (e) => {
		e.preventDefault();
		actLogin({ email, password });
	};

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
							value={email}
							onChange={(e) => onChange(e)}
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

const mapStateToProps = (state) => ({
	isAuthenticated: state.login.isAuthenticated
});

export default connect(mapStateToProps, { actLogin })(Login);
