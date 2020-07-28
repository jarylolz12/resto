import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actFetchUpdate } from '../../action/menuUpdate';
import { actFetchDelete } from '../../action/menuDelete';
import { LoadingSpin } from '../layout/LoadingSpin';
import { Link } from 'react-router-dom';
import { actMenu } from '../../action/menu';

const StaffMenu = ({ menu, category, actFetchUpdate, actFetchDelete, actMenu }) => {
	const onClickDelete = async (id) => {
		actFetchDelete(id);
		actMenu();
	};

	return category === null || menu === null ? (
		<LoadingSpin />
	) : (
		<Fragment>
			{category.map((categorize) => (
				<div className="menuCategory" key={categorize._id}>
					<h2>{categorize.mnuCategory}</h2>
					{menu.map(
						(putahe) =>
							categorize._id === putahe.mnuCategory[0]._id && (
								<ul className="itemName" key={putahe._id}>
									<li onClick={async () => actFetchUpdate(putahe._id)}>
										<Link to="/MenuUpdate">{putahe.mnuName}</Link>
									</li>
									<li>
										{putahe.mnuPrice}.00 Php
										<button onClick={() => onClickDelete(putahe._id)}>
											<i className="fas fa-times-circle" />
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
	actMenu: PropTypes.func.isRequired,
	actFetchDelete: PropTypes.func.isRequired,
	menu: PropTypes.array,
	category: PropTypes.array
};

const mapStateToProps = (state) => ({
	menu: state.menu,
	category: state.category
});

export default connect(mapStateToProps, { actFetchUpdate, actFetchDelete, actMenu })(StaffMenu);
