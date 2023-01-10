$(function () {
    var todoList = $('#list-group');
    var addButton = $('#add-button');
    var newText = $('#new-text');

    addButton.click(function () {
        createTodoListItem();
    });

    newText.keydown(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            createTodoListItem();
        }
    })

    function createTodoListItem() {
        var text = newText.val().trim();

        newText.removeClass('is-invalid');

        if (text.length === 0) {
            newText.addClass('is-invalid');
            return;
        }

        var item = $("<li class='list-group-item m-0 p-0'>");

        function setEditMode() {
            item.html("<div class='row mb-2'>" +
                "<div class='col-0 col-lg-2'></div>" +
                "<div class='col-9 col-lg-8 text-start'>" +
                "<input class='edit-text form-control' type='text' maxLength='85'>" +
                "<div class='edit-error-message invalid-feedback'>Текст не должен быть пустым!</div></div>" +
                "<div class='col-3 col-lg-2 text-start'>" +
                "<button class='ok-button btn btn-success me-2' type='button' title='Сохранить'>&#10003;</button>" +
                "<button class='cancel-button btn btn-secondary btn-outline-light' type='button' title='Отмена'>&#8634;</button></div></div>");

            item.find('.edit-text').val(text);

            item.find('.ok-button').click(function () {
                var editTextElement = item.find('.edit-text');
                var editText = editTextElement.val().trim();
                editTextElement.removeClass('is-invalid');

                if (editText.length === 0) {
                    editTextElement.addClass('is-invalid');
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
            item.html("<div class='row mb-2'>" +
                "<div class='col-0 col-lg-2'></div>" +
                "<div class='col-9 col-lg-8 text-start'><span class='text-block'></span></div>" +
                "<div class='col-3 col-lg-2 text-start'>" +
                "<button class='edit-button btn btn-secondary btn-outline-light me-2' type='button' title='Редактировать'>&#9998;</button>" +
                "<button class='delete-button btn btn-danger m-0' type='button' title='Удалить'>&#10005;</button></div></div>");

            item.find('.text-block').text(text);

            item.find('.delete-button').click(function () {
                newText.removeClass('is-invalid');
                item.remove();
            });

            item.find('.edit-button').click(function () {
                newText.removeClass('is-invalid');
                setEditMode();
            });
        }

        setViewMode();

        todoList.append(item);
        newText.val('');
    }
});