$(function () {
    var todoList = $('.list-group');
    var addButton = $('.add-button');
    var newText = $('#new-text');
    var errorMessage = $('.error-message');

    addButton.click(function () {
        putLine();
    });

    newText.keydown(function (e) {
        if (e.code === 'Enter') {
            e.preventDefault();
            putLine();
        }
    })

    function putLine() {
        var text = newText.val().trim();

        errorMessage.css({display: 'none'});
        newText.removeClass('is-invalid');

        if (text.length === 0) {
            errorMessage.css({display: 'block'});
            newText.addClass('is-invalid');
            return;
        }

        var item = $("<div class='row-list row mt-2'>");

        function setEditMode() {
            item.html("<div class='col'></div>" +
                "<div class='col text-start'>" +
                "<li class='list-group-item'>" +
                "<input class='edit-text form-control' type='text' maxLength='85'></li></div>" +
                "<div class='col text-start'>" +
                "<button class='ok-button btn btn-success me-2' type='button'>&#10003;</button>" +
                "<button class='cancel-button btn btn-secondary btn-outline-light' type='button'>&#8634;</button>" +
                "</div>");

            item.find('.edit-text').val(text);

            item.find('.ok-button').click(function () {
                var editTextElement = item.find('.edit-text');
                var editText = editTextElement.val();
                errorMessage.css({display: 'none'});
                newText.removeClass('is-invalid');

                if (editText.length === 0) {
                    errorMessage.css({display: 'block'});
                    editTextElement.addClass('is-invalid');
                    return;
                }

                text = item.find('.edit-text').val();
                setViewMode();
            });

            item.find('.cancel-button').click(function () {
                setViewMode();
            });
        }

        function setViewMode() {
            item.html("<div class='col'></div>" +
                "<div class='col text-start'><li class='list-group-item list-group-item-info'></li></div>" +
                "<div class='col text-start'>" +
                "<button class='delete-button btn btn-danger me-2' type='button'>&#10005;</button>" +
                "<button class='edit-button btn btn-secondary btn-outline-light' type='button'>&#9998;</button>" +
                "</div>");

            item.find('.list-group-item').text(text);

            item.find('.delete-button').click(function () {
                errorMessage.css({display: 'none'});
                newText.removeClass('is-invalid');
                item.remove();
            });

            item.find('.edit-button').click(function () {
                errorMessage.css({display: 'none'});
                newText.removeClass('is-invalid');
                setEditMode();
            });
        }

        setViewMode();

        todoList.append(item);
        newText.val('');
    }
});