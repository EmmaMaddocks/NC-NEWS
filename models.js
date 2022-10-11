const { Pool } = require("pg");
const db = require("./db/connection");
const format = require("pg-format");
const { checkExists } = require("./db/seeds/utils");

exports.getAllTopics = async () => {
  const topics = await db.query(`
    SELECT * FROM topics;`);
  return topics.rows;
};

exports.getArticleById = async (article_id) => {
await checkExists("articles", "article_id", article_id);
  const article = await db.query(
    `
    SELECT * FROM articles
    WHERE article_id = $1`,
    [article_id]
  );
  if (!article.rows) {
    await checkExists("articles", "article_id", article_id);
  }
  return article.rows;
};



exports.getAllUsers = async () => {
  const users = await db.query(`
    SELECT * FROM users;`);
  return users.rows;
};

exports.getUpdatedVotes = async (article_id, inc_votes) => {
    
  const updatedVotes = await db.query(
    `UPDATE articles
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *;`,
    [inc_votes, article_id]
  );
  if (!updatedVotes.rows[0]) {
    await checkExists("articles", "article_id", article_id);
  }
  return updatedVotes.rows[0];
};
