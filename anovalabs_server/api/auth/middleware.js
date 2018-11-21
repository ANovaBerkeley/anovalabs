const jwt = require('jsonwebtoken');

const checkTokenSetAccount = (req, res, next) => {
  const authHeader = req.get('authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log(token);
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (error, account) => {
        if (error) {
          console.log(error);
        }
        req.account = account;
        next();
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports = { checkTokenSetAccount };
