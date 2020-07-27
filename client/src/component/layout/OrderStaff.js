import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actStaffOrdersData, actStaffOrderUpdate } from '../../action/orderStaff';
import { LoadingSpin } from './LoadingSpin';
const OrderStaff = ({ actStaffOrdersData, actStaffOrderUpdate, ordersStaff, isLoaded }) => {
	const setStatus = (e, id) => {
		e.preventDefault();

		const updateData = {
			status: e.target[0].value,
			id
		};
		actStaffOrderUpdate(updateData);
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
		<div>
			<div className="activeOrders">
				{ordersStaff.map((custOrders) => (
					<ul className="list" key={custOrders.orderId}>
						<div className="left">
							<li style={{ textAlign: 'center' }}>
								<strong>Orders:</strong>
							</li>
							<li>Number - {custOrders.orderId}</li>
							<li>Total Orders - {custOrders.totalQty}</li>
							<li>Total Amount - {custOrders.totalAmount}</li>
						</div>
						<div className="right">
							<li style={{ textAlign: 'center' }}>
								<strong>Details:</strong>
							</li>

							{custOrders.orders.map((details) => (
								<li key={details.id.substr(20)}>
									{details.name} - {details.qty} pc(s)
								</li>
							))}
						</div>
						<div className="center">
							<li style={{ textAlign: 'center' }}>
								<strong>Action:</strong>
							</li>
							<li>
								<form onSubmit={(e) => setStatus(e, custOrders._id)}>
									<select name="ordStatus">
										<option defaultValue="">{custOrders.status}</option>
										<option defaultValue="Preparing">Preparing</option>
										<option defaultValue="Prepared">Prepared</option>
										<option defaultValue="Served">Served</option>
										<option defaultValue="Cancelled">Cancelled</option>
									</select>

									<input type="Submit" name="Update" value="Update" />
								</form>
							</li>
						</div>
					</ul>
				))}
			</div>
		</div>
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
