const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	isAdmin: { type: Boolean, default: false },
	staffLvl: { type: Number, default: 1 }
});

const user = mongoose.model('user', userSchema);

module.exports = user;
