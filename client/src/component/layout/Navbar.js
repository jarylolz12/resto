import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut } from '../../action/login';
import { updateFetchFlush } from '../../action/menuUpdate';
const Navbar = ({ auth: { user, isAuthenticated, loading }, logOut, orderCount, updateFetchFlush }) => {
	const { isAdmin, name } = user;

	const adminLinks = (
		<ul className="m-0">
			<li class="nav-item dropdown">
				<a
					className="nav-link dropdown-toggle p-0"
					id="navbarDropdown"
					role="button"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					Logged in as: {name}
				</a>
				<div className="dropdown-menu" aria-labelledby="navbarDropdown">
					<a className="dropdown-item">
						<Link to="/register">Staff Register</Link>
					</a>
					<a className="dropdown-item">
						<Link to="/menuNew">New</Link>
					</a>
					<a className="dropdown-item" onClick={logOut} href="/">
						<Link to="/">Log Out</Link>
					</a>
				</div>
			</li>
		</ul>
	);

	const staffLinks = (
		<ul className="m-0">
			<li className="nav-item dropdown">
				<a
					className="nav-link dropdown-toggle p-0"
					id="navbarDropdown"
					role="button"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					Logged in as: {name}
				</a>
				<div className="dropdown-menu" aria-labelledby="navbarDropdown">
					<a className="dropdown-item">
						<Link to="/menuNew">New</Link>
					</a>
					<a class="dropdown-item" onClick={logOut} href="/">
						<Link to="/">Log Out</Link>
					</a>
				</div>
			</li>
		</ul>
	);

	const landingLinks = (
		<Fragment>
			<ul className="m-0">
				<li className="nav-item">
					<span className="orderCounter">{!orderCount ? '' : orderCount}</span>
					<a href="/myOrdersConfirm" disabled={orderCount.qty <= 1}>
						<i className="fas fa-utensils" />
					</a>
				</li>
			</ul>
		</Fragment>
	);

	const staffOptions = (
		<Fragment>
			<li className="nav-item" onClick={updateFetchFlush}>
				<Link to="/staffMenu">Menu</Link>
			</li>
			<li className="nav-item">
				<Link to="/ordersStaff">Orders</Link>
			</li>
		</Fragment>
	);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark p-2">
			<a className="navbar-brand p-0" href="/">
				<i className="fas fa-carrot" />
			</a>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">{isAuthenticated && staffOptions}</ul>
				{loading && <Fragment>{landingLinks}</Fragment>}
				{isAuthenticated && <Fragment>{isAdmin ? adminLinks : staffLinks}</Fragment>}
			</div>
		</nav>
	);
};

Navbar.propTypes = {
	logOut: PropTypes.func.isRequired,
	auth: PropTypes.object,
	orderCount: PropTypes.number,
	updateFetchFlush: PropTypes.func.isRequired
};

const mapToStateProps = (state) => ({
	auth: state.login,
	orderCount: state.orders.orderCount
});

export default connect(mapToStateProps, { logOut, updateFetchFlush })(Navbar);
