const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;
class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    if (id) {
      this._id = new ObjectId(id);
    }
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("users")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("users").insertOne(this);
    }
    return dbOp
      .then((result) => {
        // console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToCart(product) {
    const productIndex = this.cart.items.findIndex(
      (cartProduct) =>
        cartProduct.productId.toString() === product._id.toString()
    );
    let quantity = 1;
    let cartItems = this.cart?.items?.length ? [...this.cart?.items] : [];

    if (productIndex >= 0) {
      quantity = cartItems[productIndex].quantity + 1;
      cartItems[productIndex].quantity = quantity;
    } else {
      cartItems.push({
        productId: new ObjectId(product._id),
        quantity,
      });
    }

    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: { items: cartItems } } });
  }

  removeFromCart(id) {
    const productIndex = this.cart.items.findIndex(
      (cartProduct) => cartProduct.productId.toString() === id.toString()
    );
    let cartItems = this.cart?.items?.length ? [...this.cart?.items] : [];

    if (productIndex >= 0) {
      cartItems.splice(productIndex, 1);
    }

    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: { items: cartItems } } });
  }

  getCart() {
    const db = getDb();

    const productIds = this.cart.items.map((item) => item.productId);

    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((product) => {
          const cartItem = this.cart.items.find(
            (item) => item.productId.toString() === product._id.toString()
          );

          return {
            ...product,
            quantity: cartItem.quantity,
          };
        });
      });
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new ObjectId(userId) })
      .next()
      .then((user) => {
        // console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
