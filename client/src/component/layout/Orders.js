import React, { useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import OrderMenu from '../subLayout/OrderMenu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actCategory } from '../../action/category';
import { actMenu } from '../../action/menu';

const Orders = ({ actCategory, actMenu, isAuthenticated }) => {
	useEffect(
		() => {
			actMenu();
			actCategory();
		},
		[ actMenu, actCategory ]
	);

	if (isAuthenticated) {
		return <Redirect to="/staffMenu" />;
	} else {
		return (
			<Fragment>
				<h1>Menu</h1>
				<div className="grid-container">
					<OrderMenu />
				</div>
			</Fragment>
		);
	}
};

Orders.propTypes = {
	actCategory: PropTypes.func.isRequired,
	actMenu: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.login.isAuthenticated
});

export default connect(mapStateToProps, { actCategory, actMenu })(Orders);

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
