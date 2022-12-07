const { getAllUsers, getUserById } = require("../models/users-model");

exports.fetchAllUsers = (req, res, next) => {
  getAllUsers()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

exports.fetchUser = (req, res, next) => {
let { username } = req.params
  getUserById(username)
    .then(user => {
      res.status(200).send(user
    );
    })
    .catch(next);
};
