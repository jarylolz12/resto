import React, { Fragment, useState } from 'react';
import { LoadingSpin } from '../layout/LoadingSpin';
import { Link } from 'react-router-dom';
const MenuUpdateForm = ({ menuUpdateFetch, category, updateFetchFlush, actMenuUpdate }) => {
	const [ newUpdate, setNewUpdate ] = useState({
		id: menuUpdateFetch.menuFetch._id,
		mnuName: menuUpdateFetch.menuFetch.mnuName,
		mnuPrice: menuUpdateFetch.menuFetch.mnuPrice,
		mnuCategory: menuUpdateFetch.menuFetch.mnuCategory[0].mnuCategory
	});

	const { mnuName, mnuCategory, mnuPrice } = newUpdate;

	const onChange = async (e) => {
		setNewUpdate({ ...newUpdate, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		actMenuUpdate(newUpdate);
	};

	return menuUpdateFetch.isLoaded === false || category === null ? (
		<LoadingSpin />
	) : (
		<Fragment>
			<form onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						name="mnuName"
						placeholder="New Menu"
						defaultValue={mnuName}
						onChange={(e) => onChange(e)}
					/>
				</div>

				<div className="form-group">
					<select name="mnuCategory" onChange={(e) => onChange(e)} className="opt">
						<option defaultValue={mnuCategory}>{mnuCategory}</option>
						{category.map((categorize) => (
							<option
								key={categorize._id}
								defaultValue={categorize.mnuCategory}
								onChange={(e) => onChange(e)}
							>
								{categorize.mnuCategory}
							</option>
						))}
					</select>
				</div>

				<div className="form-group">
					<input
						type="text"
						name="mnuPrice"
						placeholder="New Price"
						defaultValue={mnuPrice}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<input type="submit" value="Submit" style={{ marginRight: '10px' }} />

				<Link to="/staffMenu" onClick={updateFetchFlush}>
					<input type="submit" value="Back" />
				</Link>
			</form>
		</Fragment>
	);
};

export default MenuUpdateForm;
