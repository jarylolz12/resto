import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actMenuNew } from '../../action/menuNew';
import { updateFetchFlush } from '../../action/menuUpdate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CategoryNew from './CategoryNew';
import { actCategory } from '../../action/category';
const MenuNew = ({ actMenuNew, category, updateFetchFlush, actCategory }) => {
	//set ka ug state sa menu ddito sa baba mapStateToProps
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

	//kung kaya maka add naka sa category ug bagong category
	//sa category kay i display ang mga existing na category para makita kung unsa ang i add
	return (
		<div className="container">
			<div className="login">
				<h2>New Menu</h2>

				<form onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<input
							type="text"
							name="mnuName"
							value={mnuName}
							placeholder="Menu Name"
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group">
						{/* //i map dire ang category */}
						<select name="mnuCategory" onChange={(e) => onChange(e)} className="opt">
							<option value="">--Select a category--</option>
							{category.map((categorize) => (
								<option key={categorize._id} value={categorize.mnuCategory}>
									{categorize.mnuCategory}
								</option>
							))}
						</select>
					</div>

					<div className="form-group">
						<input
							type="text"
							name="mnuPrice"
							value={mnuPrice}
							placeholder="Price"
							onChange={(e) => onChange(e)}
						/>
					</div>
					<input type="submit" value="Submit" />
					<Link to="/staffMenu" onClick={updateFetchFlush}>
						<input type="submit" value="Back" style={{ marginLeft: '10px' }} />
					</Link>
				</form>
			</div>
			<CategoryNew />
		</div>
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
