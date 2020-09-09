import React, { Fragment } from 'react';
import StaffMenu from '../subLayout/StaffMenu';

const Menu = () => {
	return (
		<Fragment>
			<h2>Menu</h2>
			<div className="grid-container">
				<StaffMenu />
			</div>
		</Fragment>
	);
};

export default Menu;
