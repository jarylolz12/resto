import { combineReducers } from 'redux';
import alert from './alert';
import login from './login';
import category from './category';
import menu from './menu';
import menuNew from './menuNew';
import categoryNew from './categoryNew';
import menuUpdate from './menuUpdate';
import menuDelete from './menuDelete';
import orders from './orders';
import ordersStaff from './orderStaff';

//create alert reducers actions and types
//himo kag reducers nya export default para dire nimo siya tawagon para pag needed nimo siya, tawag2on lang nimo siya dire.
export default combineReducers({
	alert,
	login,
	category,
	menu,
	menuNew,
	categoryNew,
	menuUpdate,
	menuDelete,
	orders,
	ordersStaff
}); //dire nimo ibutang tanan ang reducers para centalized
