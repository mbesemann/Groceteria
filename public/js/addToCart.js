const carts = document.querySelectorAll("buy--btn");

const products = [
  {
    name: "Apple",
    tag: "green apple",
    price: 2.99,
    inCart: 0
  },
  {
    name: "Pear",
    tag: "green apple",
    price: 2.99,
    inCart: 0
  },
  {
    name: "Orange",
    tag: "green apple",
    price: 2.99,
    inCart: 0
  },
  {
    name: "Cherry",
    tag: "green apple",
    price: 2.99,
    inCart: 0
  }
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
      console.log("added to cart")
    cartNumbers(products[i]);
    totalCost(products[i])
  });
}
function onLoadCartNumbers() {
  const productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart").textContent = productNumbers;
  }
}
// eslint-disable-next-line no-unused-vars
function cartNumbers(product) {
  console.log("The product clicked is", product);
  const productNumbers = localStorage.getItem("cartNumbers");
  console.log(productNumbers);
  console.log(typeof productNumbers);

  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart");
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("getproductsInCart");
  cartItems = JSON.parse(cartItems);
  console.log("checking inside of setItems", cartItems);

  // eslint-disable-next-line eqeqeq
  if (cartItems != null) {
      if(cartItems[product.tag] == undefined){
          cartItems = {
              ...cartItems,
              [product.tag]: product
          }
      }
    cartItems[product.tag].inCart += 1;
  }else {
    product.inCart = 1;
    cartItems = {
    [product.tag]: product
  };

  localStorage.setItem("productsinCart", JSON.stringify(cartItems));
}
function totalCost(product) {
    // console.log("product price", product.price);
    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", cartCost + product.price)
    } else {
        localStorage.setItem("totalCost", product.price);
    }
   
}
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    // console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = "";
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="products">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="./images/${item.tag}.jpg"
            <span>${item.name}</span>
            <div class="price">${item.price},00</div>
            <div class="quantity">
            <ion-icon name="arrow-down-circle-outline"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon name="arrow-up-circle-outline"></ion-icon>
            </div>
            <div class = "total">$${item.inCart*item.price}</div>
            `
        });

        productContainer.innerHTML += `
        <div class = "cartTotalContainer">
        <h4 class = " cartTotalTitle">
        Cart Total
        </h4>
        <h4 class = "cartTotal">
        $${cartCost},00
        </h4>
        `
    }
}
onLoadCartNumbers();
displayCart();