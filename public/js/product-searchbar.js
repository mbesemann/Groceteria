const express = require("express");
const router = express.Router();
const data = require(__dirname + "../../data");
const productsData = data.products;

//PRODUCT SEARCH BY ID
router.get("/id/:id", (req, res) => {
  productsData
    .getProductById(req.params.id)
    .then(productInfo => {
      if (productInfo !== null) {
        res.send(productInfo);

        /* res.render('product/product-info', {
                                mainTitle: `${productInfo.title} •`,
                                user: req.user,
                                product: productInfo
                        }); */
      } else {
        res.render("alerts/error", {
          mainTitle: "Page Not Found •",
          code: 404,
          message: "Page Not Found",
          url: req.originalUrl,
          user: req.user
        });
      }
    })
    // eslint-disable-next-line no-unused-vars
    .catch(error => {
      res.render("alerts/error", {
        mainTitle: "Page Not Found •",
        code: 404,
        message: "Page Not Found",
        url: req.originalUrl,
        user: req.user
      });
    });
});
