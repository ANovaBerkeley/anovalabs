const express = require('express');
const router = express.Router();
const validator = require('validator');
const Account = require('../../db/account');

router.get('/',(req,res) => {
    res.json({
        message: "wow"
    });
});

function validatorAccount(account) {
     const validEmail = validator.isEmail(account.email.trim());
     console.log("email", validEmail);
     const validPassword = validator.isLength(account.password.trim(), {min:10, max:undefined});
     console.log("password",validPassword);
     return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
    console.log('body',req.body);
    const validAccount = validatorAccount(req.body);
    if(validAccount){
        Account.getOneByEmail(req.body.email.trim()).then(account => {
            console.log('account', account);
            if (!account) {
                res.json({
                    account,
                    message:'🔥'
                });
            } else {
                next(new Error('Email in use'));
            }
        });
    } else {
        next(new Error('Invalid Account'));
    }
});

module.exports = router;