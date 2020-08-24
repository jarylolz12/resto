const jwt = require('jsonwebtoken');
const jwts = 'gibberishBabies';
const { check, validationResult } = require('express-validator');

const ticket = (req, res, next) => {
	const token = req.header('x-auth-token');

	if (!token) {
		res.status(401).json({ msg: 'No token found' });
	}

	try {
		const decoded = jwt.verify(token, jwts);
		req.idUserToken = decoded.id;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token not Valid' });
	}
};

const regValidation = [
	check('name', 'Name is Required').not().isEmpty().exists(),
	check('email', 'Email must be Unique').isEmail(),
	check('password', 'Password must be 5 Characters Long').isLength({ min: 5 })
];

const loginValidation = [
	check('email', 'Email is Required').isEmail(),
	check('password', 'Password is Required').exists()
];

const MnuValidation = [
	check('mnuName', 'What is the name of this food!? AIR!??').not().isEmpty(),
	check('mnuCategory', "You don't know what is a Category?? Shame on you!").not().isEmpty(),
	check('mnuPrice', 'Is this for free?? Seriously??').not().isEmpty()
];
module.exports = { jwts, ticket, regValidation, loginValidation, MnuValidation };
