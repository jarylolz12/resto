import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { actRegister } from '../../action/register';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
const Register = ({ actRegister, isAdmin }) => {
	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		password: ''
	});

	if (!isAdmin) {
		return <Redirect to="menu" />;
	}

	const { name, email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		actRegister({ name, email, password });
	};

	return (
		<Fragment>
			<div className="login">
				<h2>Register</h2>
				<form onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<input type="text" name="name" placeholder="Name" value={name} onChange={(e) => onChange(e)} />
					</div>
					<div className="form-group">
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={email}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={password}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<input type="submit" value="Register" />
				</form>
			</div>
		</Fragment>
	);
};

Register.propTypes = {
	actRegister: PropTypes.func.isRequired,
	isAdmin: PropTypes.bool
};

const mapToStateProps = (state) => ({
	isAdmin: state.login.user.isAdmin
});

export default connect(mapToStateProps, { actRegister })(Register);