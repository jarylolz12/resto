const express = require('express');
const conft = require('../../config/middleware');
const Category = require('../../models/schemaCategory');
const router = express.Router();

router.get('/category', async (req, res) => {
	try {
		await Category.find({}).select([ '-__v', '-staffEncoded' ]).populate('staffEncoded').exec((err, data) => {
			if (err) {
				console.log(err);
			} else {
				res.json(data);
			}
		});
	} catch (err) {
		res.status(500).send({ msg: 'Server error' });
	}
});

router.post('/categoryNew', conft.ticket, async (req, res) => {
	//i check kung kinsa user naka login base sa ticket(token)
	//kung wala unod imo token

	try {
		if (!req.idUserToken) {
			res.status(400).json({ errors: [ { msg: 'Login First' } ] });
		} else {
			const { mnuCategory } = req.body;
			const id = req.idUserToken;

			const categoryExist = await Category.findOne({ mnuCategory }).select([
				'-_id',
				'-encodedDate',
				'-__v',
				'-staffEncoded'
			]);
			if (categoryExist) {
				res.status(400).json({ errors: [ { msg: `${mnuCategory} is already exist` } ] });
			} else {
				await Category.create(
					{
						mnuCategory: mnuCategory,
						encodedDate: new Date().toUTCString()
					},
					(err, categorize) => {
						if (err) {
							console.log(err);
						} else {
							categorize.staffEncoded.push(id);
							categorize.save((err, data) => {
								if (err) {
									console.log(err);
								} else {
									res.json(data);
								}
							});
						}
					}
				);
			}
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send({ msg: 'Server error' });
	}
});

module.exports = router;
