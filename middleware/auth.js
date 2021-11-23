const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); 
dotenv.config(); 
const key = process.env.KEY;
const User = require('../models/users.js');

function verifyToken(req, res, next) {
  const { token } = req.headers;

  jwt.verify(token, key, (err) => {
    if (err) return res.status(401).send({ err });
    next();
  });
}

function verifyTokenIsAdmin(req, res, next) {
  const { token } = req.headers;

  jwt.verify(token, key, (err, decoded) => {
    if (err) return res.status(401).send({ err });
    User.findOne({email: decoded.data}, (err, user) => {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(404).send(`No user with email ${decoded.data} found!`);
      if (user.isAdmin === true) next();
      else return res.status(403).send("Invalid user");
    });
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
    else {
      // check if user is admin
      User.findOne({email: decoded.data}, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send(`No user with email ${decoded.data} found!`);
        if (user.isAdmin === true) next();
        else return res.status(403).send("Invalid user");
      });
    }
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
  verifyTokenIsAdmin,
  createToken,
};