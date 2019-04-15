const express = require('express');

const router = express.Router();

const User = require('../../../db/user');

router.get('/', (req, res) => {
  res.json({
    message: 'profiles'
  });
});

router.get('/:id', (req, res, next) => {
	console.log("profile")
	User.getOneById(req.params.id).then(user => {
		if (user) {
			res.json(user);
		} else {
			next(new Error('Account Doesn\'t Exist'));
		}
	})
})

module.exports = router;