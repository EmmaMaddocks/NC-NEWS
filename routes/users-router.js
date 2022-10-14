const usersRouter = require("express").Router();
const { fetchAllUsers } = require("../controllers/users-controller");

usersRouter.route("/").get(fetchAllUsers);

module.exports = usersRouter;
