const app = require("./app");
const { PORT = 9000 } = process.env;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
