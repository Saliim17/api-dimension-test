const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const { token } = req.headers;

  jwt.verify(token, process.env.KEY, (err) => {
    if (err) return res.status(401).send({ err });
    next();
  });
}

function createToken(userId) {
  return jwt.sign({
    data: userId,
  }, process.env.KEY, { expiresIn: 60 * 60 });
}

module.exports = {
  verifyToken,
  createToken,
};