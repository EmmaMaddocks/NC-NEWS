const { Pool } = require('pg');
const db = require('./db/connection');
const format = require('pg-format');
const utils = require('./db/seeds/utils');

exports.getAllTopics = async () => {
    const topics = await db.query(`
    SELECT * FROM topics;`);
    return topics.rows;

}

exports.getArticleById = async (article_id) => {
    const article = await db.query(`
    SELECT * FROM articles
    WHERE article_id = $1`, [article_id])
    if (!article.rows) {
        await checkExists('articles', 'article_id', article_id); // We, the devs, pass in the table and column name
        } return article.rows;
};

  exports.getAllUsers = async () => {
    const users = await db.query(`
    SELECT * FROM users;`);
    return users.rows;
  }
