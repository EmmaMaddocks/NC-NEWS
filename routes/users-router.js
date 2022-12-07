const usersRouter = require("express").Router();
const { fetchAllUsers, fetchUser } = require("../controllers/users-controller");

usersRouter.route("/")
.get(fetchAllUsers)


usersRouter
  .route("/:username")
  .get(fetchUser)

module.exports = usersRouter;
