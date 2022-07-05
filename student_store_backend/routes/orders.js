const express = require("express");
const router = express.Router();
const Order = require("../models/order");

router.get("/",  async (req, res, next) => {
    try {
      const userOrders = await Order.listOrdersForUser();
      //console.log("We got'em")
      return res.status(200).json({ products });
    } catch (err) {
      next(err);
    }
  });
  
  // missing security details
  router.post("/", async (req, res, next) => {
    try {
      const { user } = res.locals;
      const newOrder = await Order.createOrder();
      return res.status(201).json({ newOrder });
    } catch (err) {
      next(err);
    }
  });


  module.exports = router;