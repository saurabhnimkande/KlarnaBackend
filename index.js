const express = require("express");
const connect = require("./src/configs/db");
const cors = require("cors");

const app = express();
const productController = require("./src/controllers/product.controller");
app.use(express.json());
app.use(cors());
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    limit: "5000mb",
    extended: true,
    parameterLimit: 100000000000,
  })
);

app.use("/products", productController);
app.use(express.static("public"));
app.listen(process.env.PORT || 2525, async () => {
  await connect();
  console.log("listning on port 2525");
});
