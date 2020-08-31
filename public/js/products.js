$(document).ready(() => {
  $(".buy--btn").on("click", addToCart);
});

function addToCart(event) {
  event.preventDefault();
  const productId = event.currentTarget.getAttribute("data-id");
  $.ajax({
    url: "/api/cart",
    type: "PUT",
    data: productId,
    success: result => {
      console.log(result);
    }
  });
}
