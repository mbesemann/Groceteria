module.exports = function(sequelize) {
  const Cart = sequelize.define("Cart", {});

  Cart.associate = function(models) {
    Cart.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Cart.hasMany(models.CartItem, {
      include: models.CartItem,
      onDelete: "cascade"
    });
  };

  return Cart;
};
