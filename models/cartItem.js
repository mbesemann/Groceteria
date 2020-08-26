module.exports = function(sequelize, DataTypes) {
  const CartItem = sequelize.define("CartItem", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  CartItem.associate = function(models) {
    CartItem.belongsTo(models.GroceryList, {
      foreignKey: {
        allowNull: true
      }
    });

    CartItem.belongsTo(models.Cart, {
      foreignKey: {
        allowNull: true
      }
    });

    CartItem.belongsTo(models.Product, {
      include: models.Product,
      foreignKey: {
        allowNull: false
      }
    });
  };

  return CartItem;
};
