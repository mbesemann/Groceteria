$(document).ready(() => {
  $(".buy--btn").on("click", addToCart);

  function addToCart(event) {
    event.preventDefault();
    const productId = event.target.getAttribute("data-id");
    $.ajax({
      method: "PUT",
      data: { productId },
      url: "/api/cart",
      success: result => {
        console.log(result);
      }
    });
  }
});
