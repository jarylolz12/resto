import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut } from '../../action/login';
import { updateFetchFlush } from '../../action/menuUpdate';
const Navbar = ({ auth: { user, isAuthenticated, loading }, logOut, orderCount, updateFetchFlush }) => {
	const [ toggleData, setToggleData ] = useState('hide');

	const classNameToggle = (e) => {
		e.preventDefault();
		toggleData === 'hide' ? setToggleData('show') : setToggleData('hide');
	};

	const { isAdmin, name } = user;

	const staffLinks = (
		<Fragment>
			<li className="navbar-menu-item">
				<span>Logged in as: </span>
			</li>
			<li className="navbar-menu-item">
				<button>{name}</button>
				<div className="nav-dropdown">
					<div className="nav-menu-dropdown">
						<Link to="/ordersStaff">
							<button className="nav-menu-dropdown-item btn-wrapper-border">Orders</button>
						</Link>

						<Link to="/menuNew">
							<button className="nav-menu-dropdown-item btn-wrapper-border">New</button>
						</Link>

						<Link to="/">
							<button className="nav-menu-dropdown-item btn-wrapper-border" onClick={logOut}>
								Log Out
							</button>
						</Link>
					</div>
				</div>
			</li>
		</Fragment>
	);

	const adminLinks = (
		<Fragment>
			<li className="navbar-menu-item">
				<span>Logged in as:</span>
			</li>
			<li className="navbar-menu-item">
				<div className="nav-dropdown">
					<button onClick={(e) => classNameToggle(e)} className="btn-wrapper">
						{name}
					</button>
					<div id={toggleData} className="nav-menu-dropdown">
						<Link to="/register">
							<button className="nav-menu-dropdown-item btn-wrapper-border">Staff Register</button>
						</Link>

						<Link to="/ordersStaff">
							<button className="nav-menu-dropdown-item btn-wrapper-border">Orders</button>
						</Link>

						<Link to="/menuNew">
							<button className="nav-menu-dropdown-item btn-wrapper-border">New</button>
						</Link>

						<Link to="/">
							<button className="nav-menu-dropdown-item btn-wrapper-border" onClick={logOut}>
								Log Out
							</button>
						</Link>
					</div>
				</div>
			</li>
		</Fragment>
	);

	const landingLinks = (
		<Fragment>
			<li className="navbar-menu-item">
				<span className="orderCounter">{!orderCount ? '' : orderCount}</span>
				<Link to="/myOrdersConfirm" title="My Orders">
					<button className="btn-wrapper">
						<i className="fas fa-utensils" />
					</button>
				</Link>
			</li>
		</Fragment>
	);

	return (
		<nav className="navbar">
			<Link to="/" className="navbar-brand" title="Home">
				<i className="fas fa-carrot" />
			</Link>

			<ul className="navbar-menu">
				{loading && <Fragment>{landingLinks}</Fragment>}
				{isAuthenticated && <Fragment>{isAdmin ? adminLinks : staffLinks}</Fragment>}
			</ul>
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
