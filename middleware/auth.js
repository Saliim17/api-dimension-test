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

function verifyTokenAndEmail(req, res, next) {
  const { token } = req.headers;
  var email = req.params.userId;
  if (email === undefined)
    email = req.params.email;

  jwt.verify(token, key, (err, decoded) => {
    if (err) return res.status(401).send({ err });
    if (email === decoded.data)
      next();
    else return res.status(403).send("Invalid user");
  });
}

function createToken(email) {
  return jwt.sign({
    data: email,
  }, key, { expiresIn: 60 * 60 });
}

module.exports = {
  verifyToken,
  verifyTokenAndEmail,
  createToken,
};