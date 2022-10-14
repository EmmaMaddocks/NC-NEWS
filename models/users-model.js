const db = require("../db/connection");

exports.getAllUsers = async () => {
  const users = await db.query(`
      SELECT * FROM users;`);
  return users.rows;
};
