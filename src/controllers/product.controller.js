const express = require("express");
const router = express.Router();

const Product = require("../models/product.model");

router.get("/", async (req, res) => {
  try {
    let discount50 = req.query.discount50 || null;
    let discount100 = req.query.discount100 || null;
    let type1 = req.query.type1 || null;
    let type2 = req.query.type2 || null;
    let type3 = req.query.type3 || null;
    let sort = req.query.sort || null;

    let products;
    if (discount100 == "true" && discount50 == "true") {
      products = await Product.find({}).lean().exec();
    } else if (discount50 == "true") {
      products = await Product.find({ discount: { $lte: 49 } })
        .lean()
        .exec();
    } else if (discount100 == "true") {
      products = await Product.find({
        discount: { $gte: 50 },
      })
        .lean()
        .exec();
    } else if (type1 == "true" && type2 == "true" && type3 == "true") {
      products = await Product.find({}).lean().exec();
    } else if (type1 == "true" && type2 == "true") {
      products = await Product.find({
        $or: [{ type: "coupons" }, { type: "exclusives" }],
      })
        .lean()
        .exec();
    } else if (type2 == "true" && type3 == "true") {
      products = await Product.find({
        $or: [{ type: "BOGO" }, { type: "exclusives" }],
      })
        .lean()
        .exec();
    } else if (type1 == "true" && type3 == "true") {
      products = await Product.find({
        $or: [{ type: "coupons" }, { type: "coupons" }],
      })
        .lean()
        .exec();
    } else if (type1 == "true") {
      products = await Product.find({
        type: "coupons",
      })
        .lean()
        .exec();
    } else if (type2 == "true") {
      products = await Product.find({
        type: "exclusives",
      })
        .lean()
        .exec();
    } else if (type3 == "true") {
      products = await Product.find({
        type: "BOGO",
      })
        .lean()
        .exec();
    } else if (sort == "lowtohigh") {
      products = await Product.find({}).sort({ title: 1 }).lean().exec();
    } else if (sort == "hightolow") {
      products = await Product.find({}).sort({ title: -1 }).lean().exec();
    } else {
      products = await Product.find({}).lean().exec();
    }

    return res.status(200).send(products);
  } catch (e) {
    return res.status(500).json({ error: e.message, status: "false" });
  }
});

module.exports = router;
