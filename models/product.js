module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Product.associate = function(models) {
    Product.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Product;
};
