const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
	mnuName: { type: String, required: true },
	mnuCategory: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'category'
		}
	],
	mnuPrice: { type: Number, required: true },
	isAvailable: { type: Boolean, default: true },
	isEdited: { type: Boolean, default: false },
	isUnli: { type: Boolean, default: false },
	staffEncoded: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	],
	encodedDate: { type: String },
	staffEdited: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	],
	editedDate: { type: String }
});

const menu = mongoose.model('menu', menuSchema);

module.exports = menu;
