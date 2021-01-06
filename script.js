console.log('connected');

/* HEADER */
var weekday = moment().format('dddd');
$('#weekday').text(weekday);

var todayDate = moment().format("D MMMM YYYY");
$('.current-date').text(todayDate);


var currentTime;
var updateTime = setInterval(function(){
    currentTime = moment().format('LT');
    $('.current-time').text(currentTime);
}, 100); //update time 10 times a second to minimise delay


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
    //add if here for empty values
    if (todoval === ""){
        //do nothing if empty
    } else {
    todoItem = $('<div class="d-flex flex-row align-items-center">'); // create div to wrap checkbox and text
    todoList.append(todoItem); // append the new div to list
    todoItem.append('<i class="far fa-square checkbox" style="margin-right:5px;"></i>'); // append checkbox to item
    todoItem.append($('<div class="todo-item">').html(todoval)); // append text to item
    todos.push(todoval);
    console.log(todoval);
    todoInput.val('');
    localStorage.setItem('to do list', JSON.stringify(todos));
    };
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
   //clear time blocks
   for(i = 9; i < 18; i++){
    $('#hour-text' + i).html('');
    localStorage.removeItem(i);
    };
    //clear to do
    todoList.html('');
    localStorage.removeItem('to do list');
    todos = [];
};

/* TO DO CHECKBOX */
// checkbox event listener to change to checked - how to keep preference?
$('.checkbox').on('click', function(){
    console.log('clicked');
    $(this).toggleClass('fa-square');
    $(this).toggleClass('fa-check-square');
})

/* TO DO CLEAR BUTTON */
$('#clear-todo').on('click',
    function(){
    todoList.html('');
    localStorage.removeItem('to do list');
    todos = [];
    });

/* CLEAR DAY BUTTON */
$('#clear-day').on('click', function(){
    for(i = 9; i < 18; i++){
        $('#hour-text' + i).html('');
        localStorage.removeItem(i);
        };
});

/* TIME BLOCKS */

/* Set colour */
var checkHour = setInterval(function(){
    var currentHour = moment().hours(); 

    $('.timeblock').each(function(){
        var hourValue = $(this).data('hour');
    
        if(currentHour > hourValue){
            $(this).addClass('past');
            $(this).removeClass('future');
            $(this).removeClass('present');
        } else if(currentHour < hourValue){
            $(this).addClass('future');
            $(this).removeClass('past');
            $(this).removeClass('present');
        } else {
            $(this).addClass('present');
            $(this).removeClass('future');
            $(this).removeClass('past');
        }
    })

}, 1000)

/* Save content */

var textHour;
var textContent;
/* MANUAL SAVE
$('.save').on('click', function(){
    textHour = $(this).parents('.timeblock').data('hour'); //this one works
    textContent = $('#hour-text' + textHour).html();
    localStorage.setItem(textHour, textContent);
});
*/

//save with interval
var autoSave = setInterval(function(){
    for(i = 9; i < 18; i++){
        textHour = $('#hour-text' + i).parents('.timeblock').data('hour'); 
        textContent = $('#hour-text' + textHour).html();
        localStorage.setItem(textHour, textContent);
    };
}, 3000)

//SAVE CURRENT DATE
saveDate = moment().format("D MMMM YYYY");
localStorage.setItem('saved date', saveDate);