"use strict"
$(document).ready(main);

var todos = [];

/**
 * MAIN
 * Function passing in functions for obtaining todos
 * This function is passed into the doc ready
 */
function main() {
  // initData();
  getTodos();
  submit();
}

/**
 * SUBMIT
 * Submits a typed entry into the submission bar.
 */
function submit() {
  var counter = $('.table').find('tr').length - 1;

  $('form').on('submit', function (event) {
    event.preventDefault();
    var text = $('#thingToDo').val();
    var $tr = $('<tr>');
    var $th = $('<th>').text(counter++);
    var $td = $('<td>').text(text);
    var $delete = $(`<td><button data-row-id="${counter}" class="btn btn-danger deleteThis">Delete</button></td>`);
    var $check = $(`<td><input id="check" type="checkbox" unchecked="true"></td>`);
    console.log(counter);
    $.post('http://localhost:3000', JSON.stringify({ body: text, id: counter }))
      .done(function (data) {

        $tr.append($th, $td, $delete, $check);
        $('.table').find('tbody').append($tr);
        alterations($check, $delete);
        updatedCounter();
        todos.push({ id: counter, body: text });
      })
      .fail(function (error) {
        console.error(error);
      });
  });
}

/**
 * STRIKETHROUGH
 * This function adds css strike-through to the checked-off items of the todo list.
 */
function strikeThrough(event) {
  var $clickedOnCheckbox = $(event.target);
  if ($clickedOnCheckbox.is(':checked')) {
    $clickedOnCheckbox.closest('tr').find('td:nth-child(2)').css("text-decoration", "line-through");
  } else {
    $clickedOnCheckbox.closest('tr').find('td:nth-child(2)').css("text-decoration", "none");
  }
}

/**
 * EDIT
 * Allows user to edit the name of the item in the todo list.
 */
function edit(e) {
  var $input = $(e.target).closest('li').addClass('editing').find('.edit');
}

/**
 * DELETE ITEM
 * Allows user to delete the entry of the list.
 */
function deleteItem(clickedOnElement) {
  $(clickedOnElement).closest('tr').remove();
}

function deleteTodo() {
  $.ajax()
}
/**
 * UPDATE COUNTER
 * Updates the counter to the number of items in the list after removing an item
 */
function updatedCounter() {

  var counter = $('.table').find('tr').length;
  $($('#myTable').children().get()
    .reverse())
    .each(function () {
      counter--;
      $(this).children(':first-child').text(counter)
    });
}

/**
 * INIT DATA
 * Stores the todo-list in local memory
 */
function initData() {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  let $todoRows = todos.map(function (todo) {
    var $tr = $('<tr>');
    var $th = $('<th>').text(todo.id);
    var $td = $('<td>').text(todo.body);
    var $delete = $(`<td><button data-row-id="${todo.id}" class="btn btn-danger deleteThis">Delete</button></td>`);
    var $check = $(`<td><input id="check" type="checkbox" unchecked="true"></td>`);

    alterations($check, $delete);
    return $($tr.append($th, $td, $delete, $check).get().reverse()).each(function () {
      todo.id;
      $(this).children(':first-child').text(todo.id)
    });
  });

  $('.table').find('tbody').append($todoRows);

  console.log(todos);
}

/**
 * ALTERATIONS
 * Changes the todo list with strikethroughs and deletes
 */
function alterations($check, $delete) {

  var counter = $('.table').find('tr').length;

  $check.change(strikeThrough);

  $delete.on('click', function () {
    console.log('stuff has happened!');
    var url_id = $(this).data();
    
      $.ajax('http://localhost:3000', { method: 'PUT', data:{id: url_id}})
      .done(function (data) {
        console.log(data);
        $(this).closest('tr').fadeOut().remove();
      })
      .fail(function(error) {
        console.error(error);
      })
    counter--;
    updatedCounter();
  });
}

/**
 * GET TODOS
 * acquires todo data in the form of a JSON object
 */
function getTodos() {
  $.ajax('http://localhost:3000', { method: 'GET' })
    .done(function (data) {
      let todos = JSON.parse(data) || [];
      let startCount = todos.length;
      let $todoRows = todos.map(function (todo) {
        var $tr = $('<tr>');
        var $th = $('<th>').text(startCount--);
        var $td = $('<td>').text(todo.body);
        var $delete = $(`<td><button data-row-id="${todo.id}" class="btn btn-danger deleteThis">Delete</button></td>`);
        var $check = $(`<td><input id="check" type="checkbox" unchecked="true"></td>`);

        alterations($check, $delete);
        return $($tr.append($th, $td, $delete, $check).get().reverse()).each(function () {
          todo.id;
          $(this).children(':first-child').text(todo.id)

        });
      });

      $('.table').find('tbody').append($todoRows);
    })
    .fail(function (error) {
      console.error(error);
    });
}
