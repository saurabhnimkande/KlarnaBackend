const express = require("express");
const connect = require("./src/configs/db");

const app = express();
const productController = require("./src/controllers/product.controller");
app.use(express.json());

app.use("/products", productController);

app.listen(process.env.PORT || 2525, async () => {
  await connect();
  console.log("listning on port 2525");
});
