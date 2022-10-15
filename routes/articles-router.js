const articlesRouter = require("express").Router();

const {
  fetchAllArticles,
  fetchUpdatedVotes,
  fetchArticleById,
  postComment,
  fetchComments,
} = require("../controllers/articles-controller");

articlesRouter
  .route("/:article_id/comments")
  .get(fetchComments)
  .post(postComment);

articlesRouter
  .route("/:article_id")
  .get(fetchArticleById)
  .patch(fetchUpdatedVotes);

articlesRouter.route("/").get(fetchAllArticles);

module.exports = articlesRouter;
