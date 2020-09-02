import React, { Fragment } from 'react';
import StaffMenu from '../subLayout/StaffMenu';

const Menu = () => {
	return (
		<Fragment>
			<h2>Menu</h2>
			<div className="menu-flex-container">
				<StaffMenu />
			</div>
		</Fragment>
	);
};

export default Menu;

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
