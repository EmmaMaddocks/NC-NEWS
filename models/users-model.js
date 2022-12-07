const db = require("../db/connection");
const { checkExists } = require("../db/seeds/utils");


exports.getAllUsers = async () => {
  const users = await db.query(`
      SELECT * FROM users;`);
  return users.rows;
};


exports.getUserById = async (username) => {
  await checkExists("users", "username", username);

  const user = await db.query(`
  SELECT *
  FROM users
  WHERE username = $1;`,
  [username]
)
  return user.rows;
};


