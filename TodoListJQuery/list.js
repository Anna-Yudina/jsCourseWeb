$(function () {
    var todoList = $('#todo-list');
    var addButton = $('#add-button');
    var newText = $('#new-text');
    var errorMessage = $('.error-message');

    addButton.click(function () {
        putLine();
    });

    newText.keydown(function (e){
        if (e.code === 'Enter') {
            e.preventDefault();
            putLine();
        }
    })

    function putLine(){
        var text = newText.val().trim();

        errorMessage.css({display: 'none'});
        newText.removeClass('red-border');

        if (text.length === 0) {
            errorMessage.css({display: 'block'});
            newText.addClass('red-border');
            return;
        }

        var item = $('<li>');

        function setEditMode() {
            item.html("<input class='edit-text' type='text' maxlength='85'>" +
                "<div class='buttons'>" +
                "<button class='ok-button' type='button'>&#10004;</button>" +
                "<button class='cancel-button' type='button'>&#8634;</button></div>");

            item.find('.edit-text').val(text);

            item.find('.ok-button').click(function () {
                var editTextElement = item.find('.edit-text');
                var editText = editTextElement.val();
                errorMessage.css({display: 'none'});
                newText.removeClass('red-border');

                if (editText.length === 0) {
                    errorMessage.css({display: 'block'});
                    editTextElement.addClass('red-border');
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
            item.html("<div class='todo-text'></div>" +
                "<div class='buttons'>" +
                "<button class='delete-button' type='button'>&#10006;</button> " +
                "<button class='edit-button' type='button'>&#9998;</button></div>");

            item.find('.todo-text').text(text);

            item.find('.delete-button').click(function () {
                errorMessage.css({display: 'none'});
                newText.removeClass('red-border');
                item.remove();
            });

            item.find('.edit-button').click(function () {
                errorMessage.css({display: 'none'});
                newText.removeClass('red-border');
                setEditMode();
            });
        }

        setViewMode();

        todoList.append(item);
        newText.val('');
    }
});