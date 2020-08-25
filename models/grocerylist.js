module.exports = function(sequelize, DataTypes) {
  const GroceryList = sequelize.define("GroceryList", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  GroceryList.associate = function(models) {
    GroceryList.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    GroceryList.hasMany(models.CartItem, {
      include: models.CartItem,
      onDelete: "cascade"
    });
  };

  return GroceryList;
};
