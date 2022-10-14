const db = require("../db/connection");
const { checkExists } = require("../db/seeds/utils");

exports.removeComment = (comment_id) => {
  return db
    .query(
      `DELETE FROM comments
              WHERE comment_id = $1;`,
      [comment_id]
    )
    .then((results) => {
      if (!results.rowCount) {
        return checkExists("comments", "comment_id", comment_id);
      }
      return results.rows;
    });
};
