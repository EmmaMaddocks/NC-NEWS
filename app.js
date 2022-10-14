const express = require("express");
const app = express();
const {
  handlePSQLErrors,
  handle500Errors,
  handleCustomErrors,
} = require("./errors");

const apiRouter = require("./routes/api-router");

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Page not found!" });
});

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handle500Errors);

module.exports = app;
