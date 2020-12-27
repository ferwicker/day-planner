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

var todos = [];

todoForm.on('submit', function(event){
    event.preventDefault();
    var todoval = todoInput.val();
    console.log(todoval),
    todoList.append($('<li class="todo-item">').html(todoval));
    todos.push(todoval);
    todoInput.val('');
    localStorage.setItem('to do list', JSON.stringify(todos));
});

/* if saved date is undefined or equal to current date then render saved items else clear all */
var saveDate = localStorage.getItem('saved date');

if(saveDate === null || saveDate === todayDate) {
    console.log('yes');
    //retrieve saved timeblocks content
    for(i = 9; i < 18; i++){
    $('#hour-text' + i).html(localStorage.getItem(i));
    };
    //retrieve and display saved to do list
    var todoItems = JSON.parse(localStorage.getItem('to do list'));
    
    for(i=0; i < todoItems.length; i++){
        todoList.append($('<li class="todo-item">').html(todoItems[i]));
    }
} else {
    console.log('no');
   //clear all
    for(i = 9; i < 18; i++){
    $('#hour-text' + i).html(''); //test tomorrow
    };
};

/* --Time blocks-- */

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

/* Retrieve saved hour content */

//save current date
saveDate = moment().format("D MMMM YYYY");
localStorage.setItem('saved date', saveDate);

/* Notes

 use forms to input the tasks, use prevent default, save to local storage, this part should
 be somewhat easy

 can tasks be saved as individual items? could they be marked as done?

 or or add a toggle between the day schedule and a to do list?

 do mobile version

 toggle to dark mode?

 what colours will be for the past-current-future? future to be default, past greyed out,
 current, maybe a colourful background?
*/
