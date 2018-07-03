"use strict"
$(document).ready(main);

function main() {
  submit();
}

/*
	SUBMIT
  Submits a typed entry into the submission bar.
*/
function submit() {
  var counter = $('.table').find('tr').length;

  $('form').on('submit', function(event) {
    event.preventDefault();

    var submission = $('#thingToDo').val();
    var text = $('#thingToDo').val();
    var $tr = $('<tr>');
    var $th = $('<th>').text(counter++);
    var $td = $('<td>').text(text);
    var $delete = $(`<td><button data-row-id="${counter}" class="btn btn-link">Delete</button></td>`);
    var $check = $(`<td><input id="check" type="checkbox" unchecked="true"></td>`)

    $tr.append($th, $td, $delete, $check);
    $('.table').find('tbody').append($tr);

    // set the on change event
    $check.change(strikeThrough);
    $delete.on('click', function() {
      deleteItem(this);
      if (counter == 1) {
        return false;
      }

      $(this).closest('tr').fadeOut().remove();
      counter--;
      thing();
    });
  });
}

/*
	STRIKETHROUGH
  This function adds css strike-through to the checked-off items of the todo list.
*/
function strikeThrough(event) {
  var $clickedOnCheckbox = $(event.target);
  if ($clickedOnCheckbox.is(':checked')) {
    $clickedOnCheckbox.closest('tr').find('td:nth-child(2)').css("text-decoration", "line-through");
  } else {
    $clickedOnCheckbox.closest('tr').find('td:nth-child(2)').css("text-decoration", "none");
  }
}

/*
	EDIT
  Allows user to edit the name of the item in the todo list.
*/
function edit(e) {
  var $input = $(e.target).closest('li').addClass('editing').find('.edit');
}

/*
	DELETE ITEM
  Allows user to delete the entry of the list.
*/
function deleteItem(clickedOnElement) {
  $(clickedOnElement).closest('tr').remove();
}

function thing() {
    var counter = $('.table').find('tr').length;
$($('#myTable').children().get()
  .reverse())
  .each(function() {
    counter--;
    $(this).children(':first-child').text(counter)
  });
}
