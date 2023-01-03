$(function () {
    var todoList = $('#todo-list');
    var addButton = $('#add-button');
    var newText = $('#new-text');
    var errorMessage = $('.error-message').first();

    addButton.click(function () {
        createTodoList();
    });

    newText.keydown(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            createTodoList();
        }
    });

    function createTodoList() {
        var text = newText.val().trim();

        errorMessage.hide();
        newText.removeClass('red-border');

        if (text.length === 0) {
            errorMessage.show();
            newText.addClass('red-border');
            return;
        }

        var item = $('<li>');

        function setEditMode() {
            item.html("<div class='edit-block'><input class='edit-text' type='text' maxlength='85'>" +
                "<div class='buttons'>" +
                "<button class='ok-button' type='button' title='Сохранить'>&#10004;</button>" +
                "<button class='cancel-button' type='button' title='Отмена'>&#8634;</button></div></div>" +
                "<div style = 'display: none' class='edit-error-message'>Текст не должен быть пустым!</div>");

            item.find('.edit-text').val(text);

            item.find('.ok-button').click(function () {
                var editTextElement = item.find('.edit-text');
                var editText = editTextElement.val().trim();
                var editErrorMessage = item.find('.edit-error-message').first();
                editErrorMessage.hide();
                editTextElement.removeClass('red-border');

                if (editText.length === 0) {
                    editErrorMessage.show();
                    editTextElement.addClass('red-border');
                    return;
                }

                text = editTextElement.val();
                setViewMode();
            });

            item.find('.cancel-button').click(function () {
                setViewMode();
            });
        }

        function setViewMode() {
            item.html("<div class='new-row-block'><div class='todo-text'></div>" +
                "<div class='buttons'>" +
                "<button class='delete-button' type='button' title='Удалить'>&#10006;</button> " +
                "<button class='edit-button' type='button' title='Редактировать'>&#9998;</button></div></div>");

            item.find('.todo-text').text(text);

            item.find('.delete-button').click(function () {
                errorMessage.hide();
                newText.removeClass('red-border');
                item.remove();
            });

            item.find('.edit-button').click(function () {
                errorMessage.hide();
                newText.removeClass('red-border');
                setEditMode();
            });
        }

        setViewMode();

        todoList.append(item);
        newText.val('');
    }
});