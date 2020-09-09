const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/resto', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

const connectDB = async () => {
	try {
		await db;

		console.log('connected from database');
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};
module.exports = connectDB;
