import React, { Fragment } from 'react';
import { LoadingSpin } from '../layout/LoadingSpin';
import { Link } from 'react-router-dom';
const MenuUpdateForm = ({ menuUpdateFetch, category, onChange, onSubmit, updateFetchFlush }) => {
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
						defaultValue={menuUpdateFetch.menuFetch.mnuName}
						onChange={(e) => onChange(e)}
					/>
				</div>

				<div className="form-group">
					<select name="menuCategory" onChange={(e) => onChange(e)} className="opt">
						<option defaultValue={menuUpdateFetch.menuFetch.mnuCategory[0].mnuCategory}>
							{menuUpdateFetch.menuFetch.mnuCategory[0].mnuCategory}
						</option>
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
						defaultValue={menuUpdateFetch.menuFetch.mnuPrice}
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
