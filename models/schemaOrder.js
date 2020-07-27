const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	orderId: { type: String, required: true },
	orders: [],
	totalQty: { type: Number, required: true },
	totalAmount: { type: Number, required: true },
	status: { type: String, required: true },
	date: { type: String }
});

const order = mongoose.model('order', orderSchema);

module.exports = order;
