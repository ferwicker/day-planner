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
var todoEl;
var todoItem;

var todos = [];

//render to dos function

function renderTodos(){
    todoList.html('');
    for(i=0; i < todos.length; i++){
        todoEl = $('<div class="d-flex flex-row align-items-center">'); // create div to wrap checkbox and text
        todoList.append(todoEl); // append the new div to list
        todoEl.append('<i class="far fa-' + todos[i].status + ' checkbox" style="margin-right:5px;"></i>'); // append checkbox to item
        todoEl.append($('<div class="todo-item">').html(todos[i].text)); // append text to item
    };
};

todoForm.on('submit', function(event){
    event.preventDefault(); 
    var todoval = todoInput.val();
    $.trim(todoval);

    if (todoval === ""){
        return;//do nothing if empty
    } else {
    todoInput.val('');
    todoItem = {'text':todoval, 'status':'square'};
    todos.push(todoItem);
    localStorage.setItem('to do list', JSON.stringify(todos));
    // add new to do item
    todoEl = $('<div class="d-flex flex-row align-items-center">'); // create div to wrap checkbox and text
    todoList.append(todoEl); // append the new div to list
    todoEl.append('<i class="far fa-' + todoItem.status + ' checkbox" style="margin-right:5px;"></i>'); // append checkbox to item
    todoEl.append($('<div class="todo-item">').html(todoval)); // append text to item
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
    renderTodos();
    } else {
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
$(document.body).on('click', '.checkbox', function(){
    console.log('clicked');
    var todoText = $(this).siblings().text();
    // find the index of the to do item in list
    var index = todos.findIndex(x => x.text ===todoText);
    // toggle property between square and checked
    var toggleProp = function(obj, prop, first, second) {
        obj[prop] = obj[prop] == first ? second : first;
      };
    toggleProp(todos[index], 'status', 'square', 'check-square');
    // replaces the saved to do list with the changed one
    localStorage.removeItem('to do list');
    localStorage.setItem('to do list', JSON.stringify(todos));
    //toggle between checked and unchecked classes
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

/* Save time blocks content */

var textHour;
var textContent;

//auto save with interval
var autoSave = setInterval(function(){
    for(i = 9; i < 18; i++){
        textHour = $('#hour-text' + i).parents('.timeblock').data('hour'); 
        textContent = $('#hour-text' + textHour).html();
        localStorage.setItem(textHour, textContent);
    };
}, 1000)

/* MANUAL SAVE (needs html buttons to be added back to work)
$('.save').on('click', function(){
    textHour = $(this).parents('.timeblock').data('hour'); //this one works
    textContent = $('#hour-text' + textHour).html();
    localStorage.setItem(textHour, textContent);
});
*/

//SAVE CURRENT DATE
saveDate = moment().format("D MMMM YYYY");
localStorage.setItem('saved date', saveDate);