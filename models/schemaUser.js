const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	isAdmin: { type: Boolean, default: false },
	staffLvl: { type: Number, default: 1 }
	//leveling sa staff:
	//pag d ka admin, staff ka.
	//sa staff naay level like kung:
	//level 1 maka cancel or change ka sa orders
	//level 2 maka access ka sa menu (pwede ka magbutang ug available nga orders sa kana nga adlaw)
	//level 3 maka access ka sa sales reports
});

const user = mongoose.model('user', userSchema);

module.exports = user;
