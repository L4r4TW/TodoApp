//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const logOutButton = document.querySelector(".logout-button");

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
logOutButton.addEventListener("click", logOut);

//functions
function addTodo(event){
    console.log("NewTodoAdding")
    // Prevent form from submitting
    event.preventDefault();

    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); 

    //Add todo to localstorage
    // saveLocalTodos(todoInput.value)

    //Add todo to django server

    fetch('/create-todo/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value
        },
        body: JSON.stringify({
            name: todoInput.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Todo added successfully');
        } else {
            console.log('Todo not added');
        }
    })
    .catch(error => {
        console.error(error);
    });

    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class= "fas fa-check"></i>'; 
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>'; 
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //Clear todo-input value
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;

    //Delete todo  
   
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeTodos(todo);
        
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }

    //Checkmark

    if(item.classList[0] === "complete-btn"){
        console.log(item.parentElement);
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        completeTodos(todo);
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;    
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":                
               
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function getTodos(){
//     let todos;
//     if(localStorage.getItem("todos") === null){
//         todos = [];
//     }else{
//         todos = JSON.parse(localStorage.getItem("todos"));
//     }

    fetch('/get-todos/')
    .then(response => response.json())
    .then(data => {
        data.forEach(todo => {
            console.log(todo.completed)
            // Todo DIV
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");

            // Create LI
            const newTodo = document.createElement('li');
            newTodo.innerText = todo.name;
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo); 

            //Check mark button
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class= "fas fa-check"></i>'; 
            completedButton.classList.add("complete-btn");
            
            todoDiv.appendChild(completedButton);

            //Check trash button
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class= "fas fa-trash"></i>'; 
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);

            //Append to list
            todoList.appendChild(todoDiv);

            //Completed tasks
            if(todo.completed === true){
                console.log("Akkor igaze")
                todoDiv.classList.add("completed");
            }
        });
    })
    .catch(error => {
        // Handle the error here
    });
}

function removeTodos(todo){

     // Remove todo from django database
     fetch('/delete-todo/', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value
         },
         body: JSON.stringify({                
             name: todo.textContent
         })
     })
     .then(response => response.json())
     .then(data => {
         if (data.success) {
             // Handle the success here
         } else {
             // Handle the error here
         }
     })
     .catch(error => {
         // Handle the error here
     });
}

function completeTodos(todo){
    
    //Tag todo completed in the database
    fetch('/complete-todo/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value
        },
        body: JSON.stringify({                
            name: todo.textContent
        })
    })
}

function logOut(){
    console.log("mivan geci")
    fetch('/logoutUser/', {
        method: 'POST',
        headers: {
        'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value
        },
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirect to the user's account page
            window.location.href = 'http://127.0.0.1:8000/';
        }
        else {
        alert('Invalid username or password');
        }
    })
    .catch(error => console.error(error));
}
