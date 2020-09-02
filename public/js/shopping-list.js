$(() => {
  var item = "";
  var $list = $("ul#sortable");
  var $listComplete = $("ul#complete");
  var $newItemForm = $("#newItemForm");
  var $newItemButton = $("#newItemButton");

  $("li").hide().each(function(index) {
    $(this)
        .delay(150 * index)
        .fadeIn(500);
  });

  $list.sortable();

  function updateCount() {
    var items = $("ul#sortable li").length;
    $("#counter").text(items);
  }
  updateCount();

  $newItemButton.show();
  $newItemForm.hide();
  $("#showForm").on("click", () => {
      $newItemButton.hide();
      $newItemForm.show();
    });

  $newItemForm.on("submit", (e) => {
      e.preventDefault();
      var text = $('#itemDescription').val();
      $list.prepend('<li>' + text + '<span class="fa fa-pencil"></span><span class="fa fa-heart-o"></span><span class="fa fa-check"></span></li>');
      $('#itemDescription').val('');
      $newItemButton.show();
      $newItemForm.hide();
      updateCount();
    });

  $list.on("click", "span.fa-pencil", function(){
    var $this = $(this).parent();
    var item = $this.text();
    var $editableText = $("<li><form id=\"editable-form\"><input type=\"text\" maxlength=\"20\" id=\"editable-text\" /><input type=\"submit\" id=\"add-editable-text\" value=\"update\" /></li>");
    $this.siblings().find("span.fa-pencil").hide();
    $this.replaceWith($editableText);
    var $editableTextValue = $("#editable-text");
    $editableTextValue.val(item);
    $editableTextValue.focus();

    $("#editable-form").on("submit", function(e){
      e.preventDefault();
      $("span.fa-pencil").parent().siblings().find("span.fa-pencil").show();
      let editedText = $editableTextValue.val();
      $(this).parent().replaceWith("<li>" + editedText + "<span class=\"fa fa-pencil\"></span><span class=\"fa fa-heart-o\"></span><span class=\"fa fa-check\"></span></li>");
    });
  });
  });
  $list.on("click", "span.fa-heart-o", function(){
    $(this).toggleClass("favorite");
  });

  $list.on("click", "span.fa-check", function(){
    var $this = $(this).parent();
    item = $this.text();
    $this.remove();
    $listComplete.append("<li class=\"complete\">" + item + "<span class=\"fa fa-trash-o\"></span><span class=\"fa fa-arrow-up\"></span></li>").hide().fadeIn(300);
    updateCount();
  });

  $listComplete.on("click", "span.fa-trash-o", function(){
    let $this = $(this).parent();
    $this.animate ({
        opacity: 0.0,
        paddingLeft: "+=180"
      },
      500,
      "swing",
      () => {
      $this.remove();
    });
  });
  });

  $listComplete.on("click", "span.fa-arrow-up", function(){
    var $this = $(this).parent();
    item = $this.text();
    $this.remove();
    $list.prepend("<li>" + item + "<span class=\"fa fa-pencil\"></span><span class=\"fa fa-heart-o\"></span><span class=\"fa fa-check\"></span></li>").hide().fadeIn(300);
    updateCount();
  });
});
