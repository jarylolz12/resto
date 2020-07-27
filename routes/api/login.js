const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conft = require('../../config/middleware');
const User = require('../../models/schemaUser');
const { check, validationResult } = require('express-validator');
const router = express.Router();

//route para sa API authentication
//authentication para sa users
//access - Public >> (public or private) - para kung need ug token para i access ang specific route like mag register ka, kung d ka allowed sa specifi page,
//unathorized access ka didto.

//login Post Route

router.post('/login', conft.loginValidation, async (req, res) => {
	//para ma handle nimo ang error or ang conditions na wala na met
	const err = validationResult(req);
	if (!err.isEmpty()) {
		return res.status(422).json({ errors: err.array() });
	}
	const { email, password } = req.body;

	try {
		//user has incorrect credentials exists
		let application = await User.findOne({ email });
		if (!application) {
			res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ] });
		} else {
			const isMatch = await bcrypt.compare(password, application.password);
			if (!isMatch) {
				res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ] });
			}
		}

		const payload = {
			user: {
				id: application.id
			}
		};

		//sign the payload and a token (jwt) -> ID Ang gigamit pang wrap sa token base sa const na payload
		jwt.sign(payload.user, conft.jwts, { expiresIn: 36000 }, (err, token) => {
			if (err) {
				console.log(err);
			} else {
				res.json({ token }); //token result
			}
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Something went wrong');
	}
});

router.get('/auth', conft.ticket, async (req, res) => {
	if (!req.idUserToken) {
		res.status(400).json({ errors: [ { msg: 'Login First' } ] });
	} else {
		try {
			const user = await User.findById(req.idUserToken).select([ '-password', '-email' ]);
			res.json(user);
		} catch (err) {
			console.error(err);
			res.status(500).send({ msg: 'Server error' });
		}
	}
});

module.exports = router;

//ang ticket na midlleware nagdala sa ID na parameter sa imong authentication. i unwrap sa imong ticket tong token nga nag contain ug (id) sa user
//mao ang req sa parameter sa get route kay naay id nga gikan sa token/ticket
