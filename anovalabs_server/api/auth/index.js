const express = require("express");
const router = express.Router();
const validator = require("validator");
const Account = require("../../db/account");
const bcrypt = require("bcrypt");
require("dotenv").config();

router.get("/", (req, res) => {
  res.json({
    message: "wow"
  });
});

function validatorAccount(account) {
  const validEmail = validator.isEmail(account.email.trim());
  console.log("email", validEmail);
  const validPassword = validator.isLength(account.password.trim(), {
    min: 10,
    max: undefined
  });
  console.log("password", validPassword);
  return validEmail && validPassword;
}

router.post("/signup", (req, res, next) => {
  console.log("body", req.body);
  const validAccount = validatorAccount(req.body);
  if (validAccount) {
    Account.getOneByEmail(req.body.email.trim()).then(account => {
      if (!account) {
        //technique #2 of bycrypt
        bcrypt.hash(
          req.body.password.trim(),
          parseInt(process.env.SALT_ROUNDS),
          function(err, hash) {
            // Store hash in your password DB.
            const account = {
              email: req.body.email.trim(),
              password: hash
            };
            Account.create(account).then(accountId => {
              res.json({
                message: "defintely some #️⃣"
              });
            });
          }
        );
      } else {
        next(new Error("Email in use"));
      }
    });
  } else {
    next(new Error("Invalid Account"));
  }
});
router.post("/login", (req, res, next) => {
  const validAccount = validatorAccount(req.body);
  if (validAccount) {
    Account.getOneByEmail(req.body.email.trim()).then(account => {
      if (account) {
        bcrypt
          .compare(req.body.password.trim(), account.password)
          .then(result => {
            if (result) {
              const isSecure = req.app.get("env") != "development";
              res.cookie("account_id", account.accountId, {
                httpOnly: true,
                secure: isSecure,
                signed: true
              });
              res.json({
                message: "its lit"
              });
            } else {
              next(new Error("Invalid login"));
            }
          });
      } else {
        next(new Error("Invalid login"));
      }
    });
  } else {
    next(new Error("Invalid login"));
  }
});

module.exports = router;
