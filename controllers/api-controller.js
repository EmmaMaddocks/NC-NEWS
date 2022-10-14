const endpoints = require("../endpoints.json");

exports.getOverview = (req, res, next) => {
  res.status(200).send({ endpoints });
};
