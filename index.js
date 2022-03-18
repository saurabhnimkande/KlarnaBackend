const express = require("express");
const connect = require("./src/config/db");

const app = express();
app.use(express.json());

app.listen(process.env.PORT || 2525, async () => {
  await connect();
  console.log("listning on port 2525");
});
