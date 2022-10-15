const { getAllUsers } = require("../models/users-model");

exports.fetchAllUsers = (req, res, next) => {
  getAllUsers()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};
