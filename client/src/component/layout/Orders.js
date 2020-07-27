import React, { useEffect } from 'react';
import OrderMenu from '../subLayout/OrderMenu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actCategory } from '../../action/category';
import { actMenu } from '../../action/menu';

const Orders = ({ actCategory, actMenu }) => {
	useEffect(
		() => {
			actMenu();
			actCategory();
		},
		[ actMenu, actCategory ]
	);

	return (
		<div>
			<div className="optionPage">
				<h1>Menu</h1>
			</div>
			<div className="menuGrid">
				<OrderMenu />
			</div>
		</div>
	);
};

Orders.propTypes = {
	actCategory: PropTypes.func.isRequired,
	actMenu: PropTypes.func.isRequired
};

export default connect(null, { actCategory, actMenu })(Orders);

// class Orders {
// 	constructor(id, name, price, category, quantity) {
// 		this.id = id;
// 		this.name = name;
// 		this.price = price;
// 		this.category = category;
// 		this.quantity = quantity;
// 	}

// 	saveToSessionOrders() {
// 		order.push(this);
// 		//sessionStorage.setItem('orders', JSON.stringify(order));
// 	}
// }

// const menu = new Orders(id, name, price, category, quantity);
// menu.saveToSessionOrders();

//para ma filter ang orders
// const onClick = async (id, name, price, category) => {
// 	function filterOrders(menu) {
// 		menuData.map((order) => {
// 			if (order.id === menu.id) {
// 				return menuData.pop(order);
// 			}
// 		});
// 	}
// 	const menu = { id, name, price, category, qty: 1 };
// 	filterOrders(menu);
// 	setMenuData([ ...menuData, menu ]);
// };
