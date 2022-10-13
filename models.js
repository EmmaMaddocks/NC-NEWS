const { Pool } = require("pg");
const db = require("./db/connection");
const format = require("pg-format");
const { checkExists } = require("./db/seeds/utils");
const { ident } = require("pg-format");

exports.getAllTopics = async () => {
  const topics = await db.query(`
    SELECT * FROM topics;`);
  return topics.rows;
};

exports.getArticleById = async (article_id) => {
  await checkExists("articles", "article_id", article_id);
  const article = await db.query(
    `
    SELECT articles.*,
    COUNT(comments.article_id)::INT
    AS comment_count
    FROM articles
    LEFT JOIN comments
    ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;
    `,
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
  if (!inc_votes || typeof inc_votes !== "number") {
    return Promise.reject({
      status: 400,
      msg: "Could not update, please ensure you have entered a vote amount in number format",
    });
  }

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

exports.getAllArticles = async (topic) => {
  let baseQuery = `
    SELECT articles.*,
    COUNT(comments.article_id)::INT
    AS comment_count
    FROM articles
    LEFT JOIN comments
    ON comments.article_id = articles.article_id
    `;

  if (topic) {
    baseQuery += `  WHERE topic = '${topic}'
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`;
  } else if (!topic) {
    baseQuery += `  GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`;
  }

  const articles = await db.query(baseQuery);
  if (articles.rows.length === 0) {
    await checkExists("articles", "topic", topic);
  }
  return articles.rows;
};

exports.getAllComments = async (article_id) => {
  await checkExists("articles", "article_id", article_id);
  const comments = await db.query(`
SELECT *
FROM comments
WHERE article_id = ${article_id}
ORDER BY created_at DESC;`);
  return comments.rows;
};

exports.publishComment = async (author, body, id) => {
  const comment = await db
    .query(
      `INSERT INTO comments (author, body, article_id)
      VALUES ($1, $2, $3)
      RETURNING *;`,
      [author, body, id]
    )
      return comment.rows[0];
};
