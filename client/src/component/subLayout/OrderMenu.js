import React, { useEffect, useCallback, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ordersFetch } from '../../action/orders';
import { LoadingSpin } from '../layout/LoadingSpin';

const OrderMenu = ({ menu, category, ordersFetch }) => {
	//set ka ug usestate
	const [ orderData, setOrderData ] = useState(() => {
		const getSession = sessionStorage.getItem('orders');
		if (getSession) {
			return JSON.parse(getSession);
		} else {
			return [];
		}
	});
	//i try sa imong state mag run kag function nga mag return ug blank na array or i fetch nimo tung sulod sa session storage
	//i filter ang mga pareho nga id sa orders gamit ang map na loop
	//everytime magclick ang function dapat mag console.log ka kung ma set ba ang state sa initial na render.
	const onClick = useCallback(
		async (id, name, price, category, qty) => {
			const find = orderData.find((orders) => orders.id === id);
			if (find) {
				const addQty = orderData.map((order) => {
					if (order.id === find.id) {
						return { ...order, qty: order.qty + qty, newPrice: order.price * (order.qty + qty) };
					}
					return { ...order };
				});
				setOrderData(addQty);
			} else {
				setOrderData([ ...orderData, { id, name, price, category, qty, newPrice: price } ]);
			}
		},
		[ orderData ]
	);

	useEffect(
		() => {
			const stringMe = JSON.stringify(orderData);
			sessionStorage.setItem('orders', stringMe);
			ordersFetch(orderData);
		},
		[ orderData, ordersFetch ]
	);

	return category === null || menu === null ? (
		<LoadingSpin />
	) : (
		<Fragment>
			{category.map((categorize) => (
				<div className="menu-category" key={categorize._id}>
					<h2>{categorize.mnuCategory}</h2>

					{menu.map(
						(putahe) =>
							categorize._id === putahe.mnuCategory[0]._id && (
								<ul className="menu-item-putahe" key={putahe._id}>
									<li title="Add to order">
										<button
											className="btn-wrapper-transparent"
											onClick={() =>
												onClick(
													putahe._id,
													putahe.mnuName,
													putahe.mnuPrice,
													putahe.mnuCategory[0].mnuCategory,
													1
												)}
										>
											{putahe.mnuName}
										</button>
									</li>
									<li>{putahe.mnuPrice}.00 Php</li>
								</ul>
							)
					)}
				</div>
			))}
		</Fragment>
	);
};

OrderMenu.propTypes = {
	menu: PropTypes.array,
	category: PropTypes.array,
	ordersFetch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	menu: state.menu,
	category: state.category
});

export default connect(mapStateToProps, { ordersFetch })(OrderMenu);
