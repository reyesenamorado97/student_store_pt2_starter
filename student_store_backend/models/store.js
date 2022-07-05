const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Store {

    static async listProducts() {
        const results = await db.query(
            `
          SELECT  p.id,
                  p.name AS "name",
                  p.category AS "category",
                  p.image AS "image",
                  p.description AS "description"
          FROM products AS p;
          `
          );
          return results.rows;
    }
}

module.exports = Store;