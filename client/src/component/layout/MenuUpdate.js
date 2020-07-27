import React, { useState } from 'react';
import MenuUpdateForm from '../subLayout/MenuUpdateForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actMenuUpdate, updateFetchFlush } from '../../action/menuUpdate';
const MenuUpdate = ({ actMenuUpdate, menuUpdateFetch, category, updateFetchFlush }) => {
	const [ newUpdate, setNewUpdate ] = useState({
		mnuName: '',
		mnuPrice: '',
		mnuCategory: ''
	});

	const { mnuName, mnuCategory, mnuPrice } = newUpdate;

	const onChange = (e) => {
		setNewUpdate({ ...newUpdate, [e.target.name]: !e.target.value ? e.target.defaultValue : e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const newUpdates = {
			_id: menuUpdateFetch.menuFetch._id,
			mnuName: !mnuName ? e.target[0].defaultValue : mnuName,
			mnuCategory: !mnuCategory ? e.target[1][0].value : mnuCategory,
			mnuPrice: !mnuPrice ? e.target[2].defaultValue : mnuPrice
		};
		actMenuUpdate(newUpdates);
	};

	return (
		<div className="container">
			<div className="login">
				<h2>Update Menu</h2>
				<MenuUpdateForm
					category={category}
					menuUpdateFetch={menuUpdateFetch}
					onChange={onChange}
					onSubmit={onSubmit}
					updateFetchFlush={updateFetchFlush}
				/>
			</div>
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
