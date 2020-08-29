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
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    // formattedPrice: {
    //   type: DataTypes.VIRTUAL,
    //   get: function() {
    //     const rawValue = parseFloat(this.getDataValue("price"));
    //     return `$${rawValue.toFixed(2)}`;
    //   }
    // },
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
