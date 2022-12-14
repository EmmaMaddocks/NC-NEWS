const format = require('pg-format');
const db = require('../connection');

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatComments = (comments, idLookup) => {
  return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
    const article_id = idLookup[belongs_to];
    return {
      article_id,
      author: created_by,
      ...this.convertTimestampToDate(restOfComment),
    };
  });
};


exports.checkExists = async (table, params, value) => {
  if (!table || !params || !value) {
    return Promise.reject({ status: 400, msg: "Request is missing info" });
  }

  const queryStr = format("SELECT * FROM %I WHERE %I = $1", table, params);
  const dbResult = await db.query(queryStr, [value]);

  if (dbResult.rows.length === 0) {
    let message = "";
    switch (table) {
      case "articles":
        message = "Resource not found";
        break;
      case "users":
        message = "User not found";
        break;
      case "topics":
        message = "Topic not found";
        break;
      case "comments":
          message = "Comment not found";
          break;
    }
    return Promise.reject({ status: 404, msg: message });
  }

};




