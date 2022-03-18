const User = require('../models/user');

exports.getUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.status(400).json(error));
};

exports.createUser = (req, res) => {
  const { username } = req.body;
  const newUser = new User({ username });
  newUser
    .save()
    .then(() => res.json('User added!'))
    .catch((error) => res.status(400).json(error));
};
