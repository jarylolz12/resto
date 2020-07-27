const express = require('express');
const conft = require('../../config/middleware');
const Menu = require('../../models/schemaMenu');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Category = require('../../models/schemaCategory');

//route para sa API menu
//access - private >> (public or private) - para kung need ug token para i access ang specific route like mag register ka, kung d ka allowed sa specifi page,

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

//**************************************itry ang params pag naa naka sa reactjs********************************************
router.post('/menuNew', conft.ticket, conft.MnuValidation, async (req, res) => {
	//i check kung kinsa user naka login base sa ticket(token)
	//kung wala unod imo token
	try {
		if (!req.idUserToken) {
			res.status(400).json({ errors: [ { msg: 'Login First' } ] });
		} else {
			const id = req.idUserToken;
			const { mnuName, mnuCategory, mnuPrice } = req.body;
			const category = await Category.find({ mnuCategory }).select([ '-mnuCategory', '-__v' ]);
			const err = validationResult(req);
			//kung wala unod ang req.body sa validation
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
			// const menuExists = menus.map((exists) => exists.mnuName).filter((exist) => exist === mnuName).toString();
			// console.log(menuExists === mnuName);
			//console.log(categoryExists);
			// if (nameExist) {
			// 	res.status(400).json({ errors: [ { msg: 'This Menu is Already in the List' } ] });
			// } else {
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
			console.log(req.params.menuId);
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
				//.populate('mnuCategory')
				.populate({ path: 'mnuCategory', select: [ '-encodedDate', '-staffEncoded', '-__v' ] });
		} catch (err) {
			console.error(err.message);
			res.status(500).send({ msg: 'Server error' });
		}
	}
});

router.put('/menu/:menuId/updt', conft.ticket, async (req, res) => {
	//query ang menuid, kuhaon id sa user base sa ticket ug ang user nga mag update

	if (!req.idUserToken) {
		res.status(400).json({ errors: [ { msg: 'Login First' } ] });
	} else {
		try {
			const { mnuName, mnuCategory, mnuPrice } = req.body;
			const userId = req.idUserToken;
			const menuId = req.params.menuId;
			const menuquery = await Menu.findById(menuId);
			const category = await Category.find({ mnuCategory }).select([ '-mnuCategory', '-__v' ]);
			//if naa ang query
			if (menuquery) {
				//create kag object base sa query
				const menuUpdt = {
					mnuName: mnuName,
					mnuCategory: category,
					mnuPrice: mnuPrice,
					isEdited: true,
					editedDate: new Date().toUTCString()
				};
				//pag makita ang menu id
				//i update niya ang menu
				await Menu.findByIdAndUpdate(menuId, { $set: menuUpdt }, { new: true }, (err, menuUsr) => {
					if (err) {
						console.log(err);
					} else {
						//isulod ang user nga nag update sa menu
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
