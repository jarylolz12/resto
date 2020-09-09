import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { actMenuNew } from '../../action/menuNew';
import { updateFetchFlush } from '../../action/menuUpdate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CategoryNew from './CategoryNew';
import { actCategory } from '../../action/category';
const MenuNew = ({ actMenuNew, category, updateFetchFlush, actCategory }) => {
	const [ menuNewData, setMenuNewData ] = useState({
		mnuName: '',
		mnuCategory: '',
		mnuPrice: ''
	});

	useEffect(
		() => {
			actCategory();
		},
		[ actCategory ]
	);

	const { mnuName, mnuCategory, mnuPrice } = menuNewData;

	const onChange = (e) => [ setMenuNewData({ ...menuNewData, [e.target.name]: e.target.value }) ];
	const onSubmit = async (e) => {
		e.preventDefault();
		actMenuNew({ mnuName, mnuCategory, mnuPrice });
	};

	return (
		<Fragment>
			<div className="form-global">
				<h2>New Menu</h2>

				<form onSubmit={(e) => onSubmit(e)}>
					<div className="form-family">
						<input
							type="text"
							name="mnuName"
							value={mnuName}
							placeholder="Menu Name"
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-family">
						<select name="mnuCategory" onChange={(e) => onChange(e)} className="opt">
							<option value="">--Select a category--</option>
							{category.map((categorize) => (
								<option key={categorize._id} value={categorize.mnuCategory}>
									{categorize.mnuCategory}
								</option>
							))}
						</select>
					</div>

					<div className="form-family">
						<input
							type="text"
							name="mnuPrice"
							value={mnuPrice}
							placeholder="Price"
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-family">
						<Link to="/staffMenu" onClick={updateFetchFlush} className="btn-wrapper danger">
							Back
						</Link>
						<input type="submit" value="Submit" className="btn-wrapper success" />
					</div>
				</form>
			</div>
			<CategoryNew />
		</Fragment>
	);
};

MenuNew.propTypes = {
	actMenuNew: PropTypes.func.isRequired,
	category: PropTypes.array,
	updateFetchFlush: PropTypes.func.isRequired,
	actCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	category: state.category
});

export default connect(mapStateToProps, { actMenuNew, updateFetchFlush, actCategory })(MenuNew);

// ,
