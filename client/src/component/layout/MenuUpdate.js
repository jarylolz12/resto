import React from 'react';
import MenuUpdateForm from '../subLayout/MenuUpdateForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LoadingSpin } from '../layout/LoadingSpin';
import { actMenuUpdate, updateFetchFlush } from '../../action/menuUpdate';
const MenuUpdate = ({ actMenuUpdate, menuUpdateFetch, category, updateFetchFlush }) => {
	return menuUpdateFetch.isLoaded === false ? (
		<LoadingSpin />
	) : (
		<div className="form-global">
			<h2>Update Menu</h2>
			<MenuUpdateForm
				category={category}
				menuUpdateFetch={menuUpdateFetch}
				updateFetchFlush={updateFetchFlush}
				actMenuUpdate={actMenuUpdate}
			/>
		</div>
	);
};

MenuUpdate.propTypes = {
	actMenuUpdate: PropTypes.func.isRequired,
	menuUpdateFetch: PropTypes.object,
	category: PropTypes.array,
	updateFetchFlush: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	menuUpdateFetch: state.menuUpdate,
	category: state.category
});

export default connect(mapStateToProps, { actMenuUpdate, updateFetchFlush })(MenuUpdate);
