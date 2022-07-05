const express = require("express");
const router = express.Router();
const Store = require("../models/store");

router.get("/",  async (req, res, next) => {
    try {
      const products = await Store.listProducts();
      console.log("We got'em")
      return res.status(200).json({ products });
    } catch (err) {
      next(err);
    }
  });
  
  module.exports = router;