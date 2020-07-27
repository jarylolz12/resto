import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to="/menu" />;
	} else {
		return (
			<Fragment>
				<div id="landing">
					<div className="landCont">
						<h1>Resto</h1>
						<hr />
						<p>It's a cruel witted taste</p>

						<div>
							<Link to="/myOrders">
								<button>Orders</button>
							</Link>
							<Link to="/about">
								<button>About</button>
							</Link>
							<Link to="/login">
								<button>Staff Login</button>
							</Link>
						</div>
					</div>
				</div>

				<ul className="slideshow">
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
