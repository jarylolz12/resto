const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	mnuCategory: { type: String, required: true },
	staffEncoded: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	],
	encodedDate: { type: String }
});

const category = mongoose.model('category', categorySchema);

module.exports = category;
