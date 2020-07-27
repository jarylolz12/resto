const express = require('express');
const bcrypt = require('bcryptjs'); // password encryption
const conft = require('../../config/middleware');
const User = require('../../models/schemaUser');
const { check, validationResult } = require('express-validator'); //naa siya documentation sa github or check sa website nila kung unsa iyang ginabuhat
const router = express.Router();
//const jwt = require('jsonwebtoken'); //tan awa sa documentation unsa ginabuhat niya

//post route para sa API users
//register user
//access - Public >> (public or private) - para kung need ug token para i access ang specific route like mag register ka, kung d ka allowed sa specifi page,
//unathorized access ka didto.

router.post('/register', conft.ticket, conft.regValidation, async (req, res) => {
	//para ma handle nimo ang error or ang conditions na wala na met
	const err = validationResult(req);
	if (!err.isEmpty()) {
		return res.status(422).json({ errors: err.array() });
	}
	if (!req.idUserToken) {
		res.status(400).json({ errors: [ { msg: 'Login First' } ] });
	} else {
		const { name, email, password } = req.body;

		try {
			//user exists
			let application = await User.findOne({ email });
			if (application) {
				res.status(400).json({ errors: [ { msg: 'Email Already Exists' } ] });
			}

			//create a new instance of a user kung wala nag exist ang user credential na g input
			user = new User({
				name: name,
				email: email,
				password: password,
				isAdmin: true
			});

			//encrypt the password with bcrypt
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			//save user in database
			await user.save((err, user) => {
				if (err) {
					console.log(err);
				} else {
					const { name } = user;
					res.json({ name });
				}
			});

			//PARA SA INITIAL CREATION UG ADMIN ACCOUNT!!!!!----------------------------
			// const err = validationResult(req);
			// if (!err.isEmpty()) {
			// 	return res.status(422).json({ errors: err.array() });
			// }

			// const { name, email, password } = req.body;

			// try {
			// 	//user exists
			// 	let application = await User.findOne({ email });
			// 	if (application) {
			// 		res.status(400).json({ errors: [ { msg: 'Email Already Exists' } ] });
			// 	}

			// 	//create a new instance of a user kung wala nag exist ang user credential na g input
			// 	user = new User({
			// 		name: name,
			// 		email: email,
			// 		password: password,
			// 		isAdmin: true
			// 	});

			// 	//encrypt the password with bcrypt
			// 	const salt = await bcrypt.genSalt(10);
			// 	user.password = await bcrypt.hash(password, salt);

			// 	//save user in database
			// 	await user.save((err, user) => {
			// 		if (err) {
			// 			console.log(err);
			// 		} else {
			// 			const { name } = user;
			// 			res.json({ name });
			// 		}
			// 	});

			//use webtoken. ang payload kay base na siya sa object ID sa bag.o nga user na mag register
			// const payload = {
			// 	user: {
			// 		id: user.id
			// 	}
			// };
			//sign the payload and a token (jwt) -> ID Ang gigamit pang wrap sa token base sa const na payload
			// jwt.sign(payload.user, conft.jwts, { expiresIn: 36000 }, (err, token) => {
			// 	if (err) {
			// 		console.log(err);
			// 	} else {
			// 		res.json({ token });
			// 	}
			// });
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Something went wrong');
		}
	}
});

module.exports = router;
