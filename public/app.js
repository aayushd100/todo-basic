/* global $ */
$(document).ready(function() {
    $.getJSON("/api/todos")
        .then(addTodos)

});

$('#todoInput').keypress(function(event) {
    if (event.which == 13) {
        createTodo($('#todoInput').val());
    }

})

$('.list').on('click','li', function(){
//update span
    updateTodo($(this));
    
})


$('.list').on('click','span', function(e){
//delete span
    e.stopPropagation();
    removeTodo($(this).parent());
    
})





function addTodos(todos) {
    //add todos to the page here
    todos.forEach(function(todo) {
        var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
        newTodo.data('id', todo._id);
        newTodo.data('completed', todo.completed);
        if (todo.completed) {
            newTodo.addClass("done");
        }
        $('.list').prepend(newTodo);
    })

}

function createTodo(todo) {
    //create new todo here
    var newTodo = $('<li class="task">' + todo + '<span>X</span></li>');
    $('.list').prepend(newTodo);
    $.post("/api/todos", {name: todo})
    .then(function(data, status) {
        newTodo.data('id', data._id);
        newTodo.data('completed', data.completed);
            $('#todoInput').val("");
            console.log('added: ' + todo);
            
        });
}

function removeTodo(todo){
   var id = todo.data('id');
    var deleteUrl = 'api/todos/' + id;
    todo.remove();
    $.ajax({
        method: "DELETE",
        url: deleteUrl
    })
    .then(function(data){
        console.log(data);
        
    }) 
}


function updateTodo(todo){
    var currentStatus = !todo.data('completed');
    var updateUrl = 'api/todos/' + todo.data('id');
    
    
    $.ajax({
        method: "PUT",
        url: updateUrl,
        data: {completed: currentStatus}
    })
    .then(function(data){
        console.log(data);
        todo.toggleClass("done");
        todo.data('completed', currentStatus);
    }) 
    
    
    
}