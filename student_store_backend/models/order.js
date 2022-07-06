const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Order {

    static async listOrdersForUser({user}) {
        const results = await db.query(
            `
          SELECT    o.id AS "orderId",
                    o.customer_id AS "customerId",
                    d.quantity AS "quantity",
                    p.name AS "name",
                    p.price AS "price"

          FROM orders AS o
          JOIN order_details AS d ON d.order_id = o.id
          JOIN products AS p ON p.id = d.product_id

          WHERE o.customer_id = (SELECT id FROM users WHERE email = $1);
          `,
            [user.email]
          );
      
          return results.rows;
    }


    static async createOrder({ order, user }) {

     if (!user) {
       throw new BadRequestError("No user provided");
     }
        
     const results = await db.query(
        `
            INSERT INTO orders (customer_id)
            VALUES ((SELECT id FROM users WHERE email = $1))
            RETURNING id,
             customer_id AS "customerID", 
             created_at AS "createdAt"
        `,
          [user.email],
    
     );

        const orderId = results.rows[0].id

        const orderArray = []
        console.log(orderId)

         order.order.forEach( async (item) => {
            const itemOrder = await db.query(
                 `
                 INSERT INTO order_details (order_id, product_id, quantity)
                 VALUES ($1, $2, $3) 
                 RETURNING order_id, product_id, quantity
                 `
                , [orderId, item.product_id, item.quantity]

            )

             orderArray.push(itemOrder)
        });
        
        return orderArray;
    }

}

module.exports = Order;