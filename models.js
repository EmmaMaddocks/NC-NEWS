const { Pool } = require('pg');
const db = require('./db/connection');
const format = require('pg-format');

exports.getAllTopics = async () => {
    const topics = await db.query(`
    SELECT * FROM topics;`);
    return topics.rows;
 //   console.log(topics.rows);
}