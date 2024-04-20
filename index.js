document.getElementById("fetchButton").addEventListener("click", fetchAndDisplayTodos);

function fetchAndDisplayTodos() {
    fetchTodos();
}

function fetchTodos() {
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then(response => response.json())
        .then(data => {
            displayTodos(data);
        })
        .catch(error => console.error("Error fetching todos:", error));
}

function displayTodos(todos) {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = ""; 

    todos.forEach(todo => {
        const todoItem = document.createElement("li");
        
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = todo.completed;
        checkBox.addEventListener("change", function() {
            toggleTodoCompletion(todo, checkBox.checked);
        });
        todoItem.appendChild(checkBox);

        const todoTitle = document.createElement("span");
        todoTitle.textContent = todo.title;
        if (todo.completed) {
            todoTitle.style.textDecoration = "line-through";
        }
        todoItem.appendChild(todoTitle);

        todoList.appendChild(todoItem);
    });
}

function toggleTodoCompletion(todo, completed) {
 
    todo.completed = completed;
    
    const todoTitle = document.querySelector(`[data-id="${todo.id}"]`);
    if (completed) {
        todoTitle.style.textDecoration = "line-through";
    } else {
        todoTitle.style.textDecoration = "none";
    }
}
