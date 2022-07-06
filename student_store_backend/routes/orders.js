const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const security = require("../middleware/security");



  router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const { user } = res.locals;
      const order = await Order.createOrder({user, order: req.body,});
      return res.status(200).json({ order });
    } catch (err) {
      next(err);
    }
  });
  
  router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
      const { user } = res.locals;
      const order = await Order.listOrdersForUser({ user });
      //console.log("We got'em")
      return res.status(200).json({ order });
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
  
// static async createOrder({order, user}) {
//     //takes user's order and stores it in database
//     const user_id = await db.query(`SELECT id FROM users WHERE email = $1`, [user.email])
//     const query = `INSERT INTO orders (
//         customer_id
//     )
//     VALUES ($1)
//     RETURNING id;
// `
// const orderId = await db.query(query, [user_id]);
// order.forEach((product) => {
//     const query = `INSERT INTO order_details (
//         order_id,
//         product_id,
//         quantity,
//         discount
//     )
//     VALUES ($1, $2, $3, $4)
//     RETURNING order_id;
//     `;
//     db.query(query, [orderId, product.id, product.quantity, product.discount])
// })
// }