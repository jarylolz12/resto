import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LoadingSpin } from './LoadingSpin';
import { Link } from 'react-router-dom';
import { ordersFetch, ordersSave } from '../../action/orders';
const OrdersConfirm = ({ orders, isLoaded, ordersFetch, ordersSave }) => {
	const [ ordersData, setOrdersData ] = useState(orders);
	const overallTotal = ordersData.reduce((total, order) => total + order.qty * order.price, 0);
	const totalQty = ordersData.reduce((total, order) => total + order.qty, 0);

	const updateStorageDatas = () => {
		const stringMe = JSON.stringify(ordersData);
		sessionStorage.setItem('orders', stringMe);
		ordersFetch(ordersData);
	};

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
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const orders = {
			orders: ordersData,
			totalAmount: overallTotal,
			totalQty: totalQty
		};
		ordersSave(orders);
		//console.log(orders);
	};

	useEffect(
		() => {
			updateStorageDatas();
		},
		[ ordersData, ordersFetch ]
	);

	return isLoaded === false || orders === null ? (
		<LoadingSpin />
	) : (
		<div className="container">
			<div className="orderForm">
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
										<button
											onClick={(e) => onUpdate(e, order.id, order.qty - 1)}
											disabled={order.qty <= 1}
										>
											-
										</button>
										<input type="text" name="orderQty" value={order.qty} readOnly={true} />
										<button onClick={(e) => onUpdate(e, order.id, order.qty + 1)}>+</button>
									</td>
									<td>
										{order.price * order.qty}
										<button onClick={(e) => onDelete(e, order.id)}>
											<i className="fas fa-times-circle" />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<table>
						<tbody>
							<tr>
								<th />
								<th />
								<th>
									<h4 style={{ textAlign: 'right' }}>Overall Total:</h4>
								</th>
								<th>
									<h4>{overallTotal}</h4>
								</th>
							</tr>
						</tbody>
					</table>
					<input type="submit" value="Proceed" />
					<Link to="/myOrders">
						<input type="submit" value="Back" />
					</Link>
				</form>
			</div>
		</div>
	);
};

OrdersConfirm.propTypes = {
	orders: PropTypes.array,
	isLoaded: PropTypes.bool,
	ordersFetch: PropTypes.func.isRequired,
	ordersSave: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	orders: state.orders.ordersFetch,
	isLoaded: state.orders.isLoaded
});

export default connect(mapStateToProps, { ordersFetch, ordersSave })(OrdersConfirm);
