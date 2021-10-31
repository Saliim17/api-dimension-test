const User = require('../models/users.js');

function getUsers(req, res) { // GET all users
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({ err });

    return res.status(200).send(users);
  });
}

function getUserByEmail(req, res) { // GET user by EMAIL
  const { userId } = req.params;
  console.log(userId);
  User.find({correo:userId}, (err, user) => {
    if (err) return res.status(404).send({ message: `Error ${err}. No users found` });

    return res.status(200).send(user);
  });
}

function createUser(req, res) { // POST user
  const newUser = new User(req.body);
  newUser.save((err, newUserData) => {
    if (err) return res.status(400).send({ message: `Error ${err}. User creation failed!` });
    return res.status(200).send(newUserData);
  });
}

function deleteUser(req, res) { // DELETE user
  const { userId } = req.params;

  User.findOneAndDelete({correo:userId}, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(404).send({ message: 'User not found!' });

    return res.status(200).send({ message: `User ${user} deleted successfully!` });
  });
}

function updateUser(req, res) { // PATCH user
  const { userId } = req.params;

  User.findOneAndUpdate({correo:userId}, req.body, (err, user) => {
    if (!user) return res.status(404).send({message: 'User not found'});
    if (err) return res.status(500).send({ err });

    return res.status(200).send({ message: `User ${user} updated` });
  });
}

module.exports = {
  getUsers,
  getUserByEmail,
  createUser,
  deleteUser,
  updateUser,
};
