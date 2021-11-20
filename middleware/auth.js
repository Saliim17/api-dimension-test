const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); 
dotenv.config(); 
const key = process.env.KEY;

function verifyToken(req, res, next) {
  const { token } = req.headers;

  jwt.verify(token, key, (err) => {
    if (err) return res.status(401).send({ err });
    next();
  });
}

function createToken(email) {
  return jwt.sign({
    data: email,
  }, key, { expiresIn: 60 * 60 });
}

module.exports = {
  verifyToken,
  createToken,
};