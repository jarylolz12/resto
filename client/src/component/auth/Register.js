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
		return <Redirect to="/staffMenu" />;
	}

	const { name, email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		actRegister({ name, email, password });
	};

	return (
		<Fragment>
			<div className="form-global">
				<h2>Register</h2>
				<form onSubmit={(e) => onSubmit(e)}>
					<div className="form-family">
						<input type="text" name="name" placeholder="Name" value={name} onChange={(e) => onChange(e)} />
					</div>
					<div className="form-family">
						<input
							type="email"
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
					<input type="submit" value="Register" className="btn-wrapper dark" />
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
