import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actCategoryNew } from '../../action/categoryNew';
import { updateFetchFlush } from '../../action/menuUpdate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { actCategory } from '../../action/category';

// category, categoryNew
const CategoryNew = ({ actCategoryNew, category, updateFetchFlush, actCategory }) => {
	const [ categoryData, setCategoryData ] = useState({
		mnuCategory: ''
	});

	const { mnuCategory } = categoryData;

	const onChange = (e) => setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		actCategoryNew({ mnuCategory });
		actCategory();
	};
	useEffect(
		() => {
			actCategory();
		},
		[ onSubmit, actCategory() ]
	);

	return (
		<div className="login">
			<h2>New Category</h2>

			<div className="catDisp">
				<h4>Existing Categories</h4>
				<ul className="catList">
					{category.map((categorize) => <li key={categorize._id}>○ {categorize.mnuCategory}</li>)}
				</ul>
			</div>

			<form onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						name="mnuCategory"
						value={mnuCategory}
						placeholder="Add Category"
						onChange={(e) => onChange(e)}
					/>
				</div>
				<input type="submit" value="Submit" />
				<Link to="/menu" onClick={updateFetchFlush}>
					<input type="submit" value="Back" style={{ marginLeft: '10px' }} />
				</Link>
			</form>
		</div>
	);
};

CategoryNew.propTypes = {
	actCategoryNew: PropTypes.func.isRequired,
	category: PropTypes.array,
	updateFetchFlush: PropTypes.func.isRequired,
	actCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	category: state.category
});

export default connect(mapStateToProps, { actCategoryNew, updateFetchFlush, actCategory })(CategoryNew);
