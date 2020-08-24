import React, { useEffect } from 'react';
import StaffMenu from '../subLayout/StaffMenu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actCategory } from '../../action/category';
import { actMenu } from '../../action/menu';

const Menu = ({ actCategory, actMenu }) => {
	useEffect(
		() => {
			actMenu();
			actCategory();
		},
		[ actMenu, actCategory ]
	);

	return (
		<div>
			<div className="optionPage">
				<h1>Menu</h1>
			</div>
			<div className="menuGrid">
				<StaffMenu />
			</div>
		</div>
	);
};

Menu.propTypes = {
	actCategory: PropTypes.func.isRequired,
	actMenu: PropTypes.func.isRequired
};

export default connect(null, { actCategory, actMenu })(Menu);

/* <ul className="itemName">
			<li>Menudo</li>
			<li>150.00 php</li>
		</ul>

		<ul className="itemName">
			<li>Asado</li>
			<li>150.00 php</li>
		</ul>

		<ul className="itemName">
			<li>Giniling</li>
			<li>100.00 php</li>
		</ul>

		<ul className="itemName">
			<li>Pasta</li>
			<li>100.00 php</li>
		</ul> */
