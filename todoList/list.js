document.addEventListener('DOMContentLoaded', function () {
    var todoList = document.getElementById('todo-list');
    var addButton = document.getElementById('add-button');
    var newText = document.getElementById('new-text');
    var errorMessage = document.querySelector('.error-message');

    addButton.addEventListener('click', function () {
        putLine();
    });

    newText.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') {
            e.preventDefault();
            putLine();
        }
    });

    function putLine(){
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
            item.innerHTML = "<input class='edit-text' type='text' maxlength='85'>" +
                "<div class='buttons'>" +
                "<button class='ok-button' type='button'>&#10004;</button>" +
                "<button class='cancel-button' type='button'>&#8634;</button></div>";

            item.querySelector('.edit-text').value = text;

            item.querySelector('.ok-button').addEventListener('click', function () {
                var editTextElement = item.querySelector('.edit-text');
                var editText = editTextElement.value;
                errorMessage.style.display = 'none';
                newText.classList.remove('red-border');

                if (editText.length === 0) {
                    errorMessage.style.display = 'block';
                    editTextElement.classList.add('red-border');
                    return;
                }

                text = item.querySelector('.edit-text').value;
                setViewMode();
            });

            item.querySelector('.cancel-button').addEventListener('click', function () {
                setViewMode();
            });
        }

        function setViewMode() {
            item.innerHTML = "<div class='todo-text'></div>" +
                "<div class='buttons'>" +
                "<button class='delete-button' type='button'>&#10006;</button> " +
                "<button class='edit-button' type='button'>&#9998;</button></div>";

            item.querySelector('.todo-text').textContent = text;

            item.querySelector(".delete-button").addEventListener('click', function () {
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