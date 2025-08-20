const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  description: { type: Sequelize.STRING, allowNull: false },
  title: { type: Sequelize.STRING, allowNull: false },
  imageUrl: { type: Sequelize.STRING(255), allowNull: false },
  price: { type: Sequelize.DOUBLE, allowNull: false },
});

module.exports = Product
