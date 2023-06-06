$(document).ready(function () {
    const todoList = $('#ft_list');
    const newButton = $('#new-button');

    newButton.on('click', function () {
        const todo = prompt('Enter a new TO DO');
        if (!todo) return;

        const todoDiv = $('<div class="todo"></div>').text(todo);
        todoDiv.on('click', function () {
            const confirmDelete = confirm(`Are you sure you want to delete "${todo}"?`);
            if (confirmDelete) {
                $(this).remove();
                updateCookie();
            }
        });

        todoList.prepend(todoDiv);
        updateCookie();
    });

    function updateCookie() {
        const todos = todoList.children().map(function () {
            return $(this).text();
        }).get();
        document.cookie = `todos=${JSON.stringify(todos)}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }

    const cookie = document.cookie.split(';').find(cookie => cookie.startsWith('todos='));
    if (cookie) {
        const todos = JSON.parse(cookie.split('=')[1]);
        todos.forEach(todo => {
            const todoDiv = $('<div class="todo"></div>').text(todo);
            todoDiv.on('click', function () {
                const confirmDelete = confirm(`Are you sure you want to delete "${todo}"?`);
                if (confirmDelete) {
                    $(this).remove();
                    updateCookie();
                }
            });

            todoList.append(todoDiv);
        });
    }
});