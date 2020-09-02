// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const { sequelize } = require("../models");
const { Op } = require("sequelize");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/products");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/admin", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/admin.html"));
  });

  app.get("/products", isAuthenticated, (req, res) => {
    db.Product.findAll({
      // raw: true,
      include: db.Category
    }).then(products => {
      res.render("products", {
        products: JSON.parse(JSON.stringify(products))
      });
    });
  });

  app.get("/products/category/:category", isAuthenticated, (req, res) => {
    db.Product.findAll({
      //raw: true,
      include: { model: db.Category, where: { name: req.params.category } }
    }).then(products => {
      res.render("products", {
        products: JSON.parse(JSON.stringify(products))
      });
    });
  });

  app.get("/products/search/", isAuthenticated, (req, res) => {
    db.Product.findAll({
      //raw: true,
      // include: db.Category,
      where: { name: { [Op.like]: `%${req.query.keyword}%` } }
    }).then(products => {
      res.render("products", {
        products: JSON.parse(JSON.stringify(products))
      });
    });
  });

  app.get(
    "/cart",
    /*isAuthenticated,*/ (req, res) => {
      db.Cart.findOne({
        where: { UserID: 2 /*req.user.id*/ }
      }).then(cart => {
        db.CartItem.findAll({
          where: { CartId: cart.id },
          include: { model: db.Product },
          attributes: [
            // "Product.name",
            // "Product.id",
            "id",
            [sequelize.fn("count", sequelize.col("Product.id")), "count"]
          ],
          group: ["Product.id", "CartItem.id"]
        }).then(cartItems => {
          res.render("user-cart", {
            cart: JSON.parse(JSON.stringify(cartItems))
          });
        });
      });
    }
  );

  app.get("/navbar", (req, res) => {
    res.render("navBar");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/products", isAuthenticated, (req, res) => {
  //   // res.sendFile(path.join(__dirname, "../public/products.html"));
  //   res.redirect("/products");
  // });
};
