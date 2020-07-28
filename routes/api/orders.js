const express = require('express');
const conft = require('../../config/middleware');
const Orders = require('../../models/schemaOrder');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const pdf = require('html-pdf');
const template = require('../../documents');
const uuid = require('uuid/v4');
const format = {
	format: 'A5',
	orientation: 'landscape'
};
//route para sa API authentication
//authentication para sa orders
//access - Public >> (public or private) - para kung need ug token para i access ang specific route like mag register ka, kung d ka allowed sa specifi page,
//unathorized access ka didto.
router.get('/orders', conft.ticket, async (req, res) => {
	try {
		await Orders.find({}, (err, data) => {
			if (err) {
				return console.log(err);
			} else {
				return res.json(data);
			}
		});
	} catch (err) {
		res.status(500).send({ msg: 'Server error' });
	}
});

router.post('/takeOrders', async (req, res) => {
	try {
		const { orders, totalQty, totalAmount } = req.body;

		await Orders.create(
			{
				orderId: uuid().substr(30),
				orders: orders,
				totalQty: totalQty,
				totalAmount: totalAmount,
				status: 'Active',
				date: new Date().toUTCString()
			},
			(err, order) => {
				if (err) {
					return console.log(err);
				} else {
					//create siya pdf file base sa data nga i return sa create
					return pdf.create(template(order), format).toFile(`${__dirname}/result.pdf`, (err, data) => {
						if (err) {
							return res.send(Promise.reject());
						}
						return res.send(Promise.resolve());
					});
				}
			}
		);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send({ msg: 'Server error' });
	}
});

router.put('/orders/:orderId/updt', conft.ticket, async (req, res) => {
	if (!req.idUserToken) {
		res.status(400).json({ errors: [ { msg: 'Login First' } ] });
	} else {
		const { status } = req.body;
		const id = req.params.orderId;
		const menuquery = await Orders.findById(id);
		if (menuquery) {
			const statusChange = { status: status };
			await Orders.findByIdAndUpdate(id, { $set: statusChange }, { new: true }, (err, data) => {
				if (err) {
					console.log(err);
				} else {
					res.json(data);
				}
			});
		}
	}
});

router.get('/fetchStub', async (req, res) => {
	return res.sendFile(`${__dirname}/result.pdf`);
});

module.exports = router;
