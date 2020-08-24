import React, { Fragment } from 'react';
import loading from '../../img/loading.gif';
export const LoadingSpin = () => {
	return (
		<Fragment>
			<img src={loading} style={{ width: '50px', margin: 'auto', display: 'block' }} alt={loading} />
		</Fragment>
	);
};
