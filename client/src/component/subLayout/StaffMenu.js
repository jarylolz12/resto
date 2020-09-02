import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actFetchUpdate } from '../../action/menuUpdate';
import { actFetchDelete } from '../../action/menuDelete';
import { LoadingSpin } from '../layout/LoadingSpin';
import { Link } from 'react-router-dom';
import { actMenu } from '../../action/menu';
import { actCategory } from '../../action/category';

const StaffMenu = ({ menu, category, actFetchUpdate, actFetchDelete, actMenu, actCategory }) => {
	const [ deleteData, setDeleteData ] = useState({
		id: ''
	});

	const onDelete = (e, id) => {
		e.preventDefault();
		setDeleteData(id);
	};

	useEffect(
		() => {
			actFetchDelete(deleteData);
			actMenu();
			actCategory();
		},
		[ actMenu, actCategory, deleteData, actFetchDelete ]
	);

	return category === null || menu === null ? (
		<LoadingSpin />
	) : (
		<Fragment>
			{category.map((categorize) => (
				<div className="menu-category" key={categorize._id}>
					<h2>{categorize.mnuCategory}</h2>
					{menu.map(
						(putahe) =>
							categorize._id === putahe.mnuCategory[0]._id && (
								<ul className="menu-item-putahe" key={putahe._id}>
									<li title="Edit Menu" onClick={() => actFetchUpdate(putahe._id)}>
										<Link to="/MenuUpdate">{putahe.mnuName}</Link>
									</li>
									<li>
										{putahe.mnuPrice}.00 Php
										<button title="Delete Menu" onClick={(e) => onDelete(e, putahe._id)}>
											<i className="fas fa-times" />
										</button>
									</li>
								</ul>
							)
					)}
				</div>
			))}
		</Fragment>
	);
};

StaffMenu.propTypes = {
	actFetchUpdate: PropTypes.func.isRequired,
	actCategory: PropTypes.func.isRequired,
	actMenu: PropTypes.func.isRequired,
	actFetchDelete: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	menu: state.menu,
	category: state.category
});

export default connect(mapStateToProps, { actFetchUpdate, actFetchDelete, actMenu, actCategory })(StaffMenu);
