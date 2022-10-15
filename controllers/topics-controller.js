const { getAllTopics } = require("../models/topics-model");

exports.fetchAllTopics = (req, res, next) => {
  getAllTopics()
    .then((topics) => {
      res.status(200).send(topics);
    })
    .catch(next);
};
