const mongoose = require('mongoose');
const db = mongoose.connect('mongodb+srv://jaryl:jaryl@resto.8cgyi.gcp.mongodb.net/resto?retryWrites=true&w=majority', {
	// pangalan or pag create sa imong database
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

// const db = mongoose.connect('mongodb://localhost:27017/resto', {
// 	// pangalan or pag create sa imong database
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useFindAndModify: false,
// 	useCreateIndex: true
// });

const connectDB = async () => {
	try {
		await db; // db nga naa sa taas nakadeclare akong gi gamit: localhost lang na siya

		console.log('connected from database');
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};
module.exports = connectDB;
