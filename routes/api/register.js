const express = require('express');
const bcrypt = require('bcryptjs');
const conft = require('../../config/middleware');
const User = require('../../models/schemaUser');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.post('/register', conft.ticket, conft.regValidation, async (req, res) => {
	const err = validationResult(req);
	if (!err.isEmpty()) {
		return res.status(422).json({ errors: err.array() });
	}
	if (!req.idUserToken) {
		res.status(400).json({ errors: [ { msg: 'Login First' } ] });
	} else {
		const { name, email, password } = req.body;

		try {
			let application = await User.findOne({ email });
			if (application) {
				res.status(400).json({ errors: [ { msg: 'Email Already Exists' } ] });
			}

			user = new User({
				name: name,
				email: email,
				password: password,
				isAdmin: true
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save((err, user) => {
				if (err) {
					console.log(err);
				} else {
					const { name } = user;
					res.json({ name });
				}
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Something went wrong');
		}
	}
});

module.exports = router;
