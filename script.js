console.log('connected');


/* TO DO LIST */

var todoInput = $("#todo-text");
var todoForm = $("#todo-form");
var todoList = $("#todo-list");

var todos = [];

todoForm.on('submit', function(event){
    event.preventDefault();
    var todoval = todoInput.val();
    console.log(todoval),
    $('#todo-list').append($('<li class="todo-item">').text(todoval));
    todoInput.val('');
});



/* Notes
Use moment.js

choose fonts and colours
display current date at the top, format : Monday, 14 December (next line) 2020
then maybe if there's time add a cool quote for the day that can be picked at random from a matrix.

Need to set up the classes for the final look

Auto generate the hour blocks, use an if statement to check if the current hour is more, less or same
 - but also has to check with the date? do I give each hour a value? or will it know
 if 9 is 9am or pm automatically...

 use forms to input the tasks, use prevent default, save to local storage, this part should
 be somewhat easy

 can tasks be saved as individual items? could they be marked as done?

 or or add a toggle between the day schedule and a to do list?

 do mobile version

 toggle to dark mode?

 what colours will be for the past-current-future? future to be default, past greyed out,
 current, maybe a colourful background?
*/
