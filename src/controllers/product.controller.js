const express = require("express");
const router = express.Router();

const Product = require("../models/product.model");

router.get("/", async (req, res) => {
  try {
    console.log(req.query);
    let discount50 = req.query.discount50 || null;
    let discount100 = req.query.discount100 || null;
    let type = req.query.type || null;

    let products;

    if (discount100 && discount50) {
      products = await Product.find({}).lean().exec();
    } else if (discount50) {
      products = await Product.find({ discount: { $lte: 49 } })
        .lean()
        .exec();
    } else if (discount100) {
      products = await Product.find({
        discount: { $gte: 50 },
      })
        .lean()
        .exec();
    } else if (type) {
      products = await Product.find({ type: `${type}` })
        .lean()
        .exec();
    } else {
      products = await Product.find({}).lean().exec();
    }

    return res.status(200).send(products);
  } catch (e) {
    return res.status(500).json({ error: e.message, status: "false" });
  }
});

module.exports = router;
