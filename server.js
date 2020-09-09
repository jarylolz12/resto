const express = require('express');
const conDb = require('./config/db');
const path = require('path');

conDb();
app = express();
app.use(express.json({ extended: false }));

const routeLogin = require('./routes/api/login');
const routeRegister = require('./routes/api/register');
const routeOrders = require('./routes/api/orders');
const routeMenu = require('./routes/api/menu');
const routeCategory = require('./routes/api/category');

app.use(routeRegister);
app.use(routeLogin);
app.use(routeOrders);
app.use(routeMenu);
app.use(routeCategory);

//serve static assets sa production
if (process.env.NODE_ENV === 'production') {
	//set static folder
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = 5000;
//idungag ni niya na port kay dili basahon sa heroku,
//nya i push jud tanan gamit ang WSL mapa github man or heroku kay sala nimo ni!!
app.listen(process.env.PORT, () => console.log(`server started on http://127.0.0.1:${PORT}/`));
