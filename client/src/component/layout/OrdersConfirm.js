import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LoadingSpin } from './LoadingSpin';
import { Link, Redirect } from 'react-router-dom';
import { ordersFetch, ordersSave } from '../../action/orders';
const OrdersConfirm = ({ orders, isLoaded, ordersFetch, ordersSave, isAuthenticated }) => {
	// const updateStorageDatas = () => {
	// 	const stringMe = JSON.stringify(ordersData);
	// 	sessionStorage.setItem('orders', stringMe);
	// 	ordersFetch(ordersData);
	// };

	const [ ordersData, setOrdersData ] = useState(orders);

	const updateStorageDatas = useCallback(
		() => {
			const stringMe = JSON.stringify(ordersData);
			sessionStorage.setItem('orders', stringMe);
			ordersFetch(ordersData);
		},
		[ ordersData, ordersFetch ]
	);

	useEffect(
		() => {
			updateStorageDatas();
		},
		[ ordersData, updateStorageDatas ]
	);

	if (isAuthenticated) {
		return <Redirect to="/staffMenu" />;
	} else {
		const overallTotal = ordersData.reduce((total, order) => total + order.qty * order.price, 0);
		const totalQty = ordersData.reduce((total, order) => total + order.qty, 0);

		const onUpdate = async (e, id, newQty) => {
			e.preventDefault();
			const updateQty = ordersData.map((orders) => {
				if (orders.id === id) {
					const newPrice = orders.price * newQty;
					return { ...orders, qty: newQty, newPrice: newPrice };
				}
				return orders;
			});
			setOrdersData(updateQty);
		};

		const onDelete = async (e, id) => {
			e.preventDefault();
			setOrdersData([ ...ordersData.filter((order) => order.id !== id) ]);
			updateStorageDatas();
		};

		const onSubmit = async (e) => {
			e.preventDefault();
			const orders = {
				orders: ordersData,
				totalAmount: overallTotal,
				totalQty: totalQty
			};
			ordersSave(orders);
		};

		return isLoaded === false || orders === null ? (
			<LoadingSpin />
		) : (
			<div className="form-global">
				<h2>Checkout</h2>
				<form onSubmit={(e) => onSubmit(e)}>
					<table>
						<tbody>
							<tr>
								<th>
									<h4>Order</h4>
								</th>
								<th>
									<h4>Category</h4>
								</th>
								<th>
									<h4>QTY</h4>
								</th>
								<th>
									<h4>Price</h4>
								</th>
							</tr>
							{ordersData.map((order) => (
								<tr key={order.id.substr(10)}>
									<td>{order.name}</td>
									<td>{order.category}</td>
									<td>
										<div className="qty-counter">
											<button
												onClick={(e) => onUpdate(e, order.id, order.qty - 1)}
												disabled={order.qty <= 1}
												title="Deduct 1"
												className="btn-wrapper dark"
											>
												-
											</button>
											<input type="text" name="orderQty" value={order.qty} readOnly={true} />
											<button
												title="Add 1"
												onClick={(e) => onUpdate(e, order.id, order.qty + 1)}
												className="btn-wrapper dark"
											>
												+
											</button>
										</div>
									</td>
									<td>
										{order.price * order.qty}
										<button
											onClick={(e) => onDelete(e, order.id)}
											title="Cancel"
											className="btn-wrapper-transparent"
										>
											<i className="fas fa-times" />
										</button>
									</td>
								</tr>
							))}
						</tbody>
						<tbody>
							<tr>
								<td>
									<Link to="/myOrders" className="btn-wrapper danger">
										Back
									</Link>
								</td>
								<td>
									<input
										className="btn-wrapper success"
										title="Generate Claim Stub"
										type="submit"
										value="Proceed"
										disabled={overallTotal <= 1}
									/>
								</td>
								<td>
									<h4>Overall Total:</h4>
								</td>
								<td>
									<h4>{overallTotal}</h4>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		);
	}
};

OrdersConfirm.propTypes = {
	orders: PropTypes.array,
	isLoaded: PropTypes.bool,
	ordersFetch: PropTypes.func.isRequired,
	ordersSave: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	orders: state.orders.ordersFetch,
	isLoaded: state.orders.isLoaded,
	isAuthenticated: state.login.isAuthenticated
});

export default connect(mapStateToProps, { ordersFetch, ordersSave })(OrdersConfirm);
