$(document).ready(() => {
  const categoryForm = $("#category");
  const productForm = $("#product");

  $(categoryForm).on("submit", handleCategorySubmit);
  $(productForm).on("submit", handleProductSubmit);

  function handleCategorySubmit(event) {
    event.preventDefault();

    const newCategory = {
      name: $("#categoryName")
        .val()
        .trim(),
      description: $("#categoryDescription")
        .val()
        .trim()
    };

    $.post("/api/categories", newCategory);
  }

  function handleProductSubmit(event) {
    console.log("here");
    event.preventDefault();

    const newProduct = {
      name: $("#productName")
        .val()
        .trim(),
      description: $("#productDescription")
        .val()
        .trim(),
      price: $("#productPrice")
        .val()
        .trim(),
      photoUrl: $("#productPhotoUrl")
        .val()
        .trim(),
      CategoryId: $("#productCategoryID")
        .val()
        .trim()
    };

    $.post("/api/products", newProduct);
  }
});
