const todoList = document.querySelector('#ft_list');
const newButton = document.querySelector('#new-button');

newButton.addEventListener('click', () => {
    const todo = prompt('Enter a new TO DO');
    if (!todo) return;

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.innerText = todo;
    todoDiv.addEventListener('click', () => {
        const confirmDelete = confirm(`Are you sure you want to delete "${todo}"?`);
        if (confirmDelete) {
            todoDiv.remove();
            updateCookie();
        }
    });

    todoList.prepend(todoDiv);
    updateCookie();
});

function updateCookie() {
    const todos = Array.from(todoList.children).map(todo => todo.innerText);
    document.cookie = `todos=${JSON.stringify(todos)}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

const cookie = document.cookie.split(';').find(cookie => cookie.startsWith('todos='));
if (cookie) {
    const todos = JSON.parse(cookie.split('=')[1]);
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.innerText = todo;
        todoDiv.addEventListener('click', () => {
            const confirmDelete = confirm(`Are you sure you want to delete "${todo}"?`);
            if (confirmDelete) {
                todoDiv.remove();
                updateCookie();
            }
        });

        todoList.appendChild(todoDiv);
    });
}