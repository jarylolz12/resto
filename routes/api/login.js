const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conft = require('../../config/middleware');
const User = require('../../models/schemaUser');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.post('/login', conft.loginValidation, async (req, res) => {
	//para ma handle nimo ang error or ang conditions na wala na met
	const err = validationResult(req);
	if (!err.isEmpty()) {
		return res.status(422).json({ errors: err.array() });
	}
	const { email, password } = req.body;
	try {
		let application = await User.findOne({ email: email });
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

		jwt.sign(payload.user, conft.jwts, { expiresIn: 3600 }, (err, token) => {
			if (err) {
				console.log(err);
			} else {
				res.json({ token });
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
