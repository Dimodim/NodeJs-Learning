const db = require("../util/database");

const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save(product) {
    return db.execute(
      `INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)`,
      [product.title, product.price, product.description, product.imageUrl]
    );
  }

  static deleteById(productId) {
    db.execute(`DELETE FROM products WHERE id = ?`, [productId]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(productId) {
    return db.execute(`SELECT * FROM products WHERE id = ?`, [productId]);
  }
};
