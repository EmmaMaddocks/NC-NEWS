const {
  getAllTopics,
  getArticleById,
  getAllUsers,
  getUpdatedVotes,
  getAllArticles,
} = require("./models");

exports.fetchAllTopics = (req, res, next) => {
  getAllTopics()
    .then((topics) => {
      res.status(200).send(topics);
    })
    .catch(next);
};

exports.fetchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  getArticleById(article_id)
    .then((article) => {
      res.status(200).send(article[0]);
    })
    .catch(next);
};

exports.fetchAllUsers = (req, res, next) => {
  getAllUsers()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

exports.fetchUpdatedVotes = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;
  getUpdatedVotes(article_id, inc_votes)
    .then((updatedVotes) => {
      res.status(200).send(updatedVotes);
    })
    .catch(next);
};

exports.fetchAllArticles = (req, res, next) => {
  const { topic } = req.query;

  getAllArticles(topic)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(next);
};
