const express = require('express');
const conft = require('../../config/middleware');
const Menu = require('../../models/schemaMenu');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Category = require('../../models/schemaCategory');

router.get('/menu', async (req, res) => {
	try {
		await Menu.find({})
			.select([ '-isAvailable', '-isEdited', '-isUnli', '-staffEncoded', '-encodedDate', '-staffEdited' ])
			.populate('mnuCategory')
			.exec((err, putahe) => {
				if (err) {
					console.log(err);
				} else {
					res.json(putahe);
				}
			});
	} catch (err) {
		res.status(500).send({ msg: 'Server error' });
	}
});

router.post('/menuNew', conft.ticket, conft.MnuValidation, async (req, res) => {
	try {
		if (!req.idUserToken) {
			res.status(400).json({ errors: [ { msg: 'Login First' } ] });
		} else {
			const id = req.idUserToken;
			const { mnuName, mnuCategory, mnuPrice } = req.body;
			const category = await Category.find({ mnuCategory }).select([ '-mnuCategory', '-__v' ]);
			const err = validationResult(req);

			if (!err.isEmpty()) {
				return res.status(422).json({ errors: err.array() });
			}

			const menus = await Menu.find({}).populate('mnuCategory');
			const menuExists = menus
				.map((exists) => [ { name: exists.mnuName, category: exists.mnuCategory[0].mnuCategory } ])
				.filter((exist) => exist[0].name === mnuName && exist[0].category === mnuCategory);

			if (menuExists[0]) {
				res.status(400).json({ errors: [ { msg: 'This Menu is Already in the List' } ] });
			} else {
				await Menu.create(
					{
						mnuName: mnuName,
						mnuCategory: category,
						mnuPrice: mnuPrice,
						encodedDate: new Date().toUTCString()
					},
					(err, putahe) => {
						if (err) {
							console.log(err);
						} else {
							//since naa man ang user, i push pud nimo sa database kung kinsa ang user nga nag encode
							putahe.staffEncoded.push(id);
							//save sa database ang imo g push na user sa database
							putahe.save((err, data) => {
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

router.get('/menu/:menuId', conft.ticket, async (req, res) => {
	if (!req.idUserToken) {
		res.status(400).json({ errors: [ { msg: 'Login First' } ] });
	} else {
		try {
			const menuId = req.params.menuId;
			await Menu.findById(menuId, (err, data) => {
				if (err) {
					console.log(err);
				} else {
					res.json(data);
				}
			})
				.select([
					'-encodedDate',
					'-staffEncoded',
					'-isUnli',
					'-staffEdited',
					'-__v',
					'-isEdited',
					'-editedDate'
				])
				.populate({ path: 'mnuCategory', select: [ '-encodedDate', '-staffEncoded', '-__v' ] });
		} catch (err) {
			console.error(err.message);
			res.status(500).send({ msg: 'Server error' });
		}
	}
});

router.put('/menu/:menuId/updt', conft.ticket, async (req, res) => {
	if (!req.idUserToken) {
		res.status(400).json({ errors: [ { msg: 'Login First' } ] });
	} else {
		try {
			const { mnuName, mnuCategory, mnuPrice } = req.body;
			const userId = req.idUserToken;
			const menuId = req.params.menuId;
			const menuquery = await Menu.findById(menuId);
			const category = await Category.find({ mnuCategory }).select([ '-mnuCategory', '-__v' ]);

			if (menuquery) {
				//create kag object base sa query
				const menuUpdt = {
					mnuName: mnuName,
					mnuCategory: category,
					mnuPrice: mnuPrice,
					isEdited: true,
					editedDate: new Date().toUTCString()
				};

				await Menu.findByIdAndUpdate(menuId, { $set: menuUpdt }, { new: true }, (err, menuUsr) => {
					if (err) {
						console.log(err);
					} else {
						menuUsr.staffEdited.push(userId);
						menuUsr.save((err, data) => {
							if (err) {
								console.log(err);
							} else {
								res.json(data);
							}
						});
					}
				});
			}
		} catch (err) {
			console.error(err.message);
			res.status(500).send({ msg: 'Server error' });
		}
	}
});

router.delete('/menu/:menuId/del', conft.ticket, async (req, res) => {
	if (!req.idUserToken) {
		res.status(400).json({ errors: [ { msg: 'Login First' } ] });
	} else {
		try {
			const delMenu = req.params.menuId;
			if (!delMenu) {
				console.log('TUARA');
			}
			await Menu.findByIdAndRemove(delMenu, (err, data) => {
				if (err) {
					console.log(err);
				} else {
					return res.json(data);
				}
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send({ msg: 'Server error' });
		}
	}
});

module.exports = router;
