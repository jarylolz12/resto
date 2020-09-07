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
				<button onClick={(e) => classNameToggle(e)}>{name}</button>
				<div id={toggleData} className="nav-menu-dropdown">
					<div className="nav-menu-dropdown-item">
						<Link to="/ordersStaff" className="btn-wrapper dark">
							Orders
						</Link>
					</div>

					<div className="nav-menu-dropdown-item">
						<Link to="/menuNew" className="btn-wrapper dark">
							New
						</Link>
					</div>

					<div className="nav-menu-dropdown-item">
						<Link to="/" className="btn-wrapper dark" onClick={logOut}>
							Log Out
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
					<button onClick={(e) => classNameToggle(e)} className="btn-wrapper-transparent ">
						{name}
					</button>
					<div id={toggleData} onMouseLeave={(e) => classNameToggle(e)} className="nav-menu-dropdown">
						<div className="nav-menu-dropdown-item">
							<Link to="/register" className="btn-wrapper dark">
								Staff Register
							</Link>
						</div>

						<div className="nav-menu-dropdown-item">
							<Link to="/ordersStaff" className="btn-wrapper dark">
								Orders
							</Link>
						</div>

						<div className="nav-menu-dropdown-item">
							<Link to="/menuNew" className="btn-wrapper dark">
								New
							</Link>
						</div>

						<div className="nav-menu-dropdown-item">
							<Link to="/" className="btn-wrapper dark" onClick={logOut}>
								Log Out
							</Link>
						</div>
					</div>
				</div>
			</li>
		</Fragment>
	);

	const landingLinks = (
		<Fragment>
			<li className="navbar-menu-item">
				<span className="orderCounter">{!orderCount ? '' : orderCount}</span>
				<Link
					to="/myOrdersConfirm"
					title="My Orders"
					className="btn-wrapper-transparent"
					style={orderCount === 0 ? { display: 'none' } : { display: 'inline' }}
				>
					<i className="fas fa-utensils" />
				</Link>
			</li>
		</Fragment>
	);

	return (
		<nav className="flex-container navbar">
			<Link
				to="/"
				className="navbar-brand"
				title="Home"
				className="btn-wrapper-transparent"
				onClick={updateFetchFlush}
			>
				<i className="fas fa-carrot" />
			</Link>

			<ul className="navbar-menu flex-container">
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
