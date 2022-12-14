const articlesRouter = require("express").Router();

const {
  fetchAllArticles,
  fetchUpdatedVotes,
  fetchArticleById,
  postComment,
  fetchComments,
  postArticle,
  deleteArticle
} = require("../controllers/articles-controller");

articlesRouter
  .route("/:article_id/comments")
  .get(fetchComments)
  .post(postComment);

  // articlesRouter
  // .route("/articles")
  // .post(postArticle);

articlesRouter
  .route("/:article_id")
  .get(fetchArticleById)
  .patch(fetchUpdatedVotes)
  .delete(deleteArticle);

articlesRouter.route("/")
.get(fetchAllArticles)
.post(postArticle);

module.exports = articlesRouter;
