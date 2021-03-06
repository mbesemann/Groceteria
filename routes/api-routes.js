// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
// eslint-disable-next-line no-unused-vars
const { sequelize, Op } = require("../models");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create(
      {
        email: req.body.email,
        password: req.body.password,
        Cart: {}
      },
      { include: db.Cart }
    )
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.post("/api/categories", (req, res) => {
    db.Category.create(req.body).then(dbPost => {
      res.json(dbPost);
    });
  });

  app.get("/api/categories", (req, res) => {
    db.Category.findAll({}).then(categories => {
      res.json(categories);
    });
  });

  app.post("/api/products", (req, res) => {
    db.Product.create(req.body).then(dbPost => {
      res.json(dbPost);
    });
  });

  app.get("/api/products/:cat", (req, res) => {
    db.Product.findAll({
      include: { model: db.Category, where: { name: req.params.cat } }
    }).then(products => {
      res.json(products);
    });
  });

  app.get("/api/products", (req, res) => {
    db.Product.findAll({
      include: db.Category
    }).then(products => {
      res.json(products);
    });
  });

  app.put("/api/cart", (req, res) => {
    db.Cart.findOne({
      where: { UserID: req.user.id }
    }).then(cart => {
      console.log(req.body);
      db.CartItem.create({
        CartId: cart.dataValues.id,
        ProductId: req.body.productId,
        quantity: 1
      }).then(result => {
        res.json(result);
      });
    });
  });

  app.delete("/api/cart", (req, res) => {
    console.log(req.body.id);
    db.CartItem.destroy({
      where: { id: req.body.id }
    }).then(result => {
      res.json(result);
    });
  });
};
