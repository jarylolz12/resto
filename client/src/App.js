import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/css/App.css';
import About from './component/layout/About';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Alert from './component/layout/Alert';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import StaffMenu from './component/layout/StaffMenu';
import MenuNew from './component/layout/MenuNew';
import CategoryNew from './component/layout/CategoryNew';
import MenuUpdate from './component/layout/MenuUpdate';
import PrivateRoute from './component/routing/PrivateRoutes';
import Orders from './component/layout/Orders';
import myOrdersConfirm from './component/layout/OrdersConfirm';
import OrdersStaff from './component/layout/OrderStaff';

//redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './action/login';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	useEffect(() => {
		store.dispatch(loadUser()); //try siya na mufetch ug data sa redux
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/about" component={About} />
						<Navbar />
					</Switch>
					<section className="container">
						<Alert />
						<Switch>
							<Route exact path="/login" component={Login} />
							<PrivateRoute exact path="/staffMenu" component={StaffMenu} />
							<PrivateRoute exact path="/register" component={Register} />
							<PrivateRoute exact path="/menuNew" component={MenuNew} />
							<PrivateRoute exact path="/categoryNew" component={CategoryNew} />
							<PrivateRoute exact path="/menuUpdate" component={MenuUpdate} />
							<PrivateRoute exact path="/ordersStaff" component={OrdersStaff} />
							<Route exact path="/myOrders" component={Orders} />
							<Route exact path="/myOrdersConfirm" component={myOrdersConfirm} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
