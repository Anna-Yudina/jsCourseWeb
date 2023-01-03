document.addEventListener('DOMContentLoaded', function () {
    var todoList = document.getElementById('todo-list');
    var addButton = document.getElementById('add-button');
    var newText = document.getElementById('new-text');
    var errorMessage = document.querySelector('.error-message');

    addButton.addEventListener('click', function () {
        createTodoListRow();
    });

    newText.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            createTodoListRow();
        }
    });

    function createTodoListRow() {
        var text = newText.value.trim();

        errorMessage.style.display = 'none';
        newText.classList.remove('red-border');

        if (text.length === 0) {
            errorMessage.style.display = 'block';
            newText.classList.add('red-border');
            return;
        }

        var item = document.createElement('li');

        function setEditMode() {
            item.innerHTML = "<div class='edit-block'><input class='edit-text' type='text' maxlength='85'>" +
                "<div class='buttons'>" +
                "<button class='ok-button' type='button' title='Сохранить'>&#10004;</button>" +
                "<button class='cancel-button' type='button' title='Отмена'>&#8634;</button></div></div>" +
                "<div style = 'display: none' class='edit-error-message'>Текст не должен быть пустым!</div>";

            item.querySelector('.edit-text').value = text;

            item.querySelector('.ok-button').addEventListener('click', function () {
                var editTextElement = item.querySelector('.edit-text');
                var editText = editTextElement.value.trim();
                var editErrorMessage = item.querySelector('.edit-error-message');
                editErrorMessage.style.display = 'none';
                newText.classList.remove('red-border');

                if (editText.length === 0) {
                    editErrorMessage.style.display = 'block';
                    editTextElement.classList.add('red-border');
                    return;
                }

                text = editText;
                setViewMode();
            });

            item.querySelector('.cancel-button').addEventListener('click', function () {
                setViewMode();
            });
        }

        function setViewMode() {
            item.innerHTML = "<div class='new-row-block'><div class='todo-text'></div>" +
                "<div class='buttons'>" +
                "<button class='delete-button' type='button' title='Удалить'>&#10006;</button> " +
                "<button class='edit-button' type='button' title='Редактировать'>&#9998;</button></div></div>";

            item.querySelector('.todo-text').textContent = text;

            item.querySelector('.delete-button').addEventListener('click', function () {
                errorMessage.style.display = 'none';
                newText.classList.remove('red-border');
                item.remove();
            });

            item.querySelector('.edit-button').addEventListener('click', function () {
                errorMessage.style.display = 'none';
                newText.classList.remove('red-border');
                setEditMode();
            });
        }

        setViewMode();

        todoList.append(item);
        newText.value = '';
    }
});