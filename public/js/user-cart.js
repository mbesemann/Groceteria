// eslint-disable-next-line no-unused-vars
function saveQty(id) {
  $(`#quant-${id}`).val($(`#quantity-${id}`).val());
}

// eslint-disable-next-line no-unused-vars
function updateQty(id) {
  // eslint-disable-next-line no-unused-vars
  const numRegex = /^[0-9]+$'/;
  const quant = $(`#quantity-${id}`).val();
  const hidden = $(`#quant-${id}`).val();

  if (quant.length > 0) {
    const qty = parseInt(quant);

    //		if (numRegex.test(qty)) {
    if (qty > 0 && qty < 6) {
      const formData = {
        id: id,
        qty: quant
      };

      $.ajax({
        url: "/user/update/cart",
        type: "PUT",
        dataType: "json",
        data: JSON.stringify(formData),
        success: function(status) {
          // eslint-disable-next-line eqeqeq
          if (status.success == true) {
            $("#saved-cart-list").load(location.href + " #saved-cart-list");
            $("#cart-size").load(location.href + " #cart-size");
            $("#total-cost").load(location.href + " #total-cost");
            $("#tax-cost").load(location.href + " #tax-cost");
            $("#net-cost").load(location.href + " #net-cost");
          } else {
            alert("Quantity cannot be less than 1 and more than 5");
          }
        },
        contentType: "application/json"
      });
    } else {
      alert("Quantity cannot be less than 1 and more than 5");
      $(`#quantity-${id}`).val(hidden);
    }
    /*		} else {
			alert("Invalid quantity. It should be numberic only.");
		}
*/
  } else {
    alert("Quantity cannot be empty");
    $(`#quantity-${id}`).val(hidden);
  }
}

// eslint-disable-next-line no-unused-vars
function deleteCartItem(prod) {
  const data = {
    id: prod
  };

  $.ajax({
    url: "/user/update/cart",
    type: "DELETE",
    dataType: "json",
    data: JSON.stringify(data),
    success: function(result) {
      $("#success-cart-list").removeClass("hidden");
      $("#saved-cart-list").load(location.href + " #saved-cart-list");
      $("#cart-size").load(location.href + " #cart-size");

      if (result.cartSize != 0) {
        $("#total-cost").load(location.href + " #total-cost");
        $("#tax-cost").load(location.href + " #tax-cost");
        $("#net-cost").load(location.href + " #net-cost");
      } else {
        $("#summary").css("display", "none");
      }

      setTimeout(() => {
        $("#success-cart-list").addClass("hidden");
      }, 6000);
    },
    contentType: "application/json"
  });
}

/* disable tab key
$(document).keydown(function(objEvent) {
    if (objEvent.keyCode == 9) {  //tab pressed
        objEvent.preventDefault(); // stops its action
    }
})
*/
