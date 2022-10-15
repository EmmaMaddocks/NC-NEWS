const db = require("../db/connection");

exports.getAllTopics = async () => {
  const topics = await db.query(`
      SELECT * FROM topics;`);
  return topics.rows;
};
