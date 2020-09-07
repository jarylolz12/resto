import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to="/staffMenu" />;
	} else {
		return (
			<Fragment>
				<div id="landing">
					<div className="landing-cont">
						<h1>Resto</h1>
						<hr />
						<p>It's a cruel witted taste</p>

						<div className="land-options">
							<Link to="/myOrders" title="Customer Orders" className="btn-wrapper dark">
								Orders
							</Link>
							<Link to="/about" title="The Specification" className="btn-wrapper dark">
								About
							</Link>
							<Link
								to="/login"
								title="Please ask the admin for log-in Credentials"
								className="btn-wrapper dark"
							>
								Staff Login
							</Link>
						</div>
					</div>
				</div>

				<ul className="slide-show">
					<li />
					<li />
					<li />
					<li />
					<li />
				</ul>
			</Fragment>
		);
	}
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.login.isAuthenticated
});

// export default Landing;

export default connect(mapStateToProps, null)(Landing);
