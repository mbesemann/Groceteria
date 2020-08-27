$(document).ready(() => {
  const categoryForm = $("#category");
  const productForm = $("#product");
  const categorySelect = $("#productCategoryID");

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

    $.post("/api/categories", newCategory, success => {
      console.log(success);
      $("#categoryStatus").text("Added category");
    });
  }

  function handleProductSubmit(event) {
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

    $.post("/api/products", newProduct, success => {
      console.log(success);
      $("#productStatus").text("Added product");
    });
  }

  function getCategories() {
    $.get("/api/categories", renderCategories);
  }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderCategories(data) {
    const rowsToAdd = [];
    for (let i = 0; i < data.length; i++) {
      rowsToAdd.push(createCategoryRow(data[i]));
    }
    categorySelect.empty();
    categorySelect.append(rowsToAdd);
  }

  // Creates the author options in the dropdown
  function createCategoryRow(category) {
    const listOption = $("<option>");
    listOption.attr("value", category.id);
    listOption.text(category.name);
    return listOption;
  }

  getCategories();
});
