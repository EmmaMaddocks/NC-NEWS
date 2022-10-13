const {
  getAllTopics,
  getArticleById,
  getAllUsers,
  getUpdatedVotes,
  getAllArticles,
  getAllComments,
  publishComment,
} = require("./models");

const { checkExists } = require("./db/seeds/utils");

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

exports.fetchComments = (req, res, next) => {
  const { article_id } = req.params;

  getAllComments(article_id)
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
    const { username } = req.body;
    const { body } = req.body;
    const { article_id } = req.params;
  
    checkExists("users", "username", username)
      .then(() => {
        if (body === "" || !body) {
          return Promise.reject({ status: 400, msg: "Please enter a comment" });
        }
      })
      .then(() => {
        publishComment(username, body, article_id).then((comment) => {
          res.status(201).send(comment);
        });
      })
      .catch(next);
  };
