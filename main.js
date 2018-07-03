"use strict"
$(document).ready(main);

var todos = [
  {
    id: 1,
    body: "stuff"
  },
  {
    id: 2,
    body: "things"
  }
];

function main() {
  initData();
  submit();
}

/*
	SUBMIT
  Submits a typed entry into the submission bar.
*/
function submit() {
  var counter = $('.table').find('tr').length;

  $('form').on('submit', function (event) {
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
    alterations($check, $delete);
    updatedCounter();
    todos.push({id: counter, body: text});
    saveTodoList();
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

/*
    UPDATE COUNTER
  Updates the counter to the number of items in the list after removing an item
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

/*
    INIT DATA
  Stores the todo-list in local memory
*/
function initData() {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  let $todoRows = todos.map(function (todo) {
    var $tr = $('<tr>');
    var $th = $('<th>').text(todo.id);
    var $td = $('<td>').text(todo.body);
    var $delete = $(`<td><button data-row-id="${todo.id}" class="btn btn-link">Delete</button></td>`);
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

/*
    ALTERATIONS
  Changes the todo list with strikethroughs and deletes
*/
function alterations($check, $delete) {

  var counter = $('.table').find('tr').length;

  $check.change(strikeThrough);
  $delete.on('click', function () {

    deleteItem(this);

    $(this).closest('tr').fadeOut().remove();
    counter--;
    updatedCounter();
  });
}

function saveTodoList() {
  localStorage.setItem('todos', JSON.stringify(todos));
}