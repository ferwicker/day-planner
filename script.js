console.log('connected');

/* HEADER */
var weekday = moment().format('dddd');
$('#weekday').text(weekday);

var todayDate = moment().format("D MMMM YYYY");
$('.current-date').text(todayDate);

var currentTime = moment().format('LT');
$('.current-time').text(currentTime);

var dailyQuote = quotes[Math.floor(Math.random() * quotes.length)];
$('.quote').text(dailyQuote);

/* TO DO LIST */

var todoInput = $("#todo-text");
var todoForm = $("#todo-form");
var todoList = $("#todo-list");
var todoItem;

var todos = [];

todoForm.on('submit', function(event){
    event.preventDefault();
    var todoval = todoInput.val();
    $.trim(todoval);
    todoItem = $('<div class="d-flex flex-row align-items-center">'); // create div to wrap checkbox and text
    todoList.append(todoItem); // append the new div to list
    todoItem.append('<i class="far fa-square checkbox" style="margin-right:5px;"></i>'); // append checkbox to item
    todoItem.append($('<div class="todo-item">').html(todoval)); // append text to item
    todos.push(todoval);
    todoInput.val('');
    localStorage.setItem('to do list', JSON.stringify(todos));
});


/* RETRIEVE SAVED CONTENT */
//if saved date is undefined or equal to current date then render saved items else clear all */
var saveDate = localStorage.getItem('saved date');

if(saveDate === null || saveDate === todayDate) {
    console.log('yes');
    //retrieve saved timeblocks content
    for(i = 9; i < 18; i++){
    $('#hour-text' + i).html(localStorage.getItem(i));
    };
    //retrieve and display saved to do list
    todos = JSON.parse(localStorage.getItem('to do list'));
    //if there are to do items saved then append list item for each
    if(todos){
    for(i=0; i < todos.length; i++){
        todoItem = $('<div class="d-flex flex-row align-items-center">'); // create div to wrap checkbox and text
        todoList.append(todoItem); // append the new div to list
        todoItem.append('<i class="far fa-square checkbox" style="margin-right:5px;"></i>'); // append checkbox to item
        todoItem.append($('<div class="todo-item">').html(todos[i])); // append text to item
    }} else {
        todos = [];
    };
// if saved date is different to current
} else {
    console.log('no');
   //clear all
    for(i = 9; i < 18; i++){
    $('#hour-text' + i).html(''); //test tomorrow
    //do a for loop to clear all local storage
    };
};

/* TO DO CHECKBOX */
// checkbox event listener to change to checked - how to keep preference?
$('.checkbox').on('click', function(){
    console.log('clicked');
    $(this).toggleClass('fa-square');
    $(this).toggleClass('fa-check-square');
})

/* TIME BLOCKS */

/* Set colour */
var currentHour = moment().hours();

$('.timeblock').each(function(){
    var hourValue = $(this).data('hour');

    if(currentHour > hourValue){
        $(this).addClass('past')
    } else if(currentHour < hourValue){
        $(this).addClass('future')
    } else {
        $(this).addClass('present')
    }
})

/* Save content */

$('.save').on('click', function(){
    var textHour = $(this).parents('.timeblock').data('hour'); //this one works
    var textContent = $('#hour-text' + textHour).html();
    console.log(textContent);
    localStorage.setItem(textHour, textContent);
})

//SAVE CURRENT DATE
saveDate = moment().format("D MMMM YYYY");
localStorage.setItem('saved date', saveDate);

/* Notes

 can tasks be saved as individual items? could they be marked as done?

 or or add a toggle between the day schedule and a to do list?

 do mobile version

 toggle to dark mode?

*/
