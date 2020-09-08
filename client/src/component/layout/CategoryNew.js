import React, { useState } from 'react';
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
		return actCategory();
	};

	// const onSubmit = useCallback(
	// 	(e, value) => {
	// 		e.preventDefault();
	// 		actCategoryNew(value);
	// 		console.log('dfgfdg');
	// 		return actCategory();
	// 	},
	// 	[ actCategory, actCategoryNew ] dili pud ka pwede mag useCallback
	// );

	// useEffect(
	// 	() => {
	// 		actCategory(); setcategory()
	// 	},
	// 	[ onSubmit, actCategory ]
	// );

	return (
		<div className="form-global">
			<h2>New Category</h2>

			{/* <div className="catDisp">
				<h4>Existing Categories</h4>
				<ul className="catList">
					{category.map((categorize) => <li key={categorize._id}>○ {categorize.mnuCategory}</li>)}
				</ul>
			</div> */}

			<form onSubmit={(e) => onSubmit(e)}>
				<div className="form-family">
					<input
						type="text"
						name="mnuCategory"
						value={mnuCategory}
						placeholder="Add Category"
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
