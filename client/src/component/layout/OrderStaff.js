import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actStaffOrdersData, actStaffOrderUpdate } from '../../action/orderStaff';
import { LoadingSpin } from './LoadingSpin';
const OrderStaff = ({ actStaffOrdersData, actStaffOrderUpdate, ordersStaff, isLoaded }) => {
	const [ updateData, setUpdateData ] = useState({
		id: '',
		ordId: '',
		status: ''
	});

	const { id } = updateData;

	const onChange = (id, orderId, status) => {
		setUpdateData({ id: id, ordId: orderId, status: status });
	};

	const setStatus = (e, id) => {
		e.preventDefault();

		console.log(updateData);
		// actStaffOrderUpdate(updateData);
	};
	useEffect(
		() => {
			actStaffOrdersData();
		},
		[ actStaffOrdersData ]
	);

	return !isLoaded ? (
		<LoadingSpin />
	) : (
		<Fragment>
			<h2>Order Queue</h2>
			<div className="grid-container">
				{ordersStaff.map((custOrders) => (
					<div className="order-form" key={custOrders.orderId}>
						<div className="order-item">
							<ul>
								<li>Number - {custOrders.orderId}</li>
								<li>Total Orders - {custOrders.totalQty}</li>
								<li>Total Amount - {custOrders.totalAmount}</li>
							</ul>
						</div>

						<div className="order-item">
							{custOrders.orders.map((details) => (
								<ul key={details.id.substr(20)}>
									<li>
										{details.name} - {details.qty} pc(s)
									</li>
								</ul>
							))}
						</div>

						<div className="order-item">
							<form onSubmit={(e) => setStatus(e)}>
								<select
									name="ordStatus"
									readOnly={true}
									disabled={custOrders.status === 'Served'}
									onChange={() => onChange(custOrders._id, custOrders.orderId, custOrders.status)}
								>
									<option value="" readOnly={true}>
										{custOrders.status}
									</option>
									<option value="Preparing">Preparing</option>
									<option value="Prepared">Prepared</option>
									<option value="Served">Served</option>
									<option value="Cancelled">Cancelled</option>
								</select>

								<input
									type="submit"
									className="btn-wrapper success"
									name="submit"
									value="Submit"
									disabled={custOrders._id !== id}
								/>
							</form>
						</div>
					</div>
				))}
			</div>
		</Fragment>
	);
};

OrderStaff.propTypes = {
	ordersStaff: PropTypes.array,
	actStaffOrdersData: PropTypes.func.isRequired,
	actStaffOrderUpdate: PropTypes.func.isRequired,
	isLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
	ordersStaff: state.ordersStaff.orders,
	isLoaded: state.ordersStaff.isLoaded
});

export default connect(mapStateToProps, { actStaffOrdersData, actStaffOrderUpdate })(OrderStaff);
