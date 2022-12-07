const {
    getArticleById,
    getAllArticles,
    getUpdatedVotes,
    getAllComments,
    publishComment,
    publishArticle
  } = require("../models/articles-model");
  
  const { checkExists } = require("../db/seeds/utils");
  
  exports.fetchArticleById = (req, res, next) => {
    const { article_id } = req.params;
    getArticleById(article_id)
      .then((article) => {
        res.status(200).send(article[0]);
      })
      .catch(next);
  };
  
  exports.fetchAllArticles = (req, res, next) => {
    const { topic, sort_by, order } = req.query;
  
    getAllArticles(topic, sort_by, order)
      .then((result) => {
        res.status(200).send(result);
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

  exports.postArticle = (req, res, next) => {
    console.log(req.body);
    let  { title, topic, author, body } = req.body;
    publishArticle(title, topic, author, body )
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(err => {
      next(err);
    });
};