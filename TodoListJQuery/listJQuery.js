$(function () {
    var todoList = $("#todo-list");
    var addButton = $("#add-button");
    var newText = $("#new-text");
    var errorMassage = $(".error-massage");

    addButton.click(function () {
        var text = newText.val().trim();

        errorMassage.css({display: "none"});
        newText.css({borderColor: '#000'});

        if (text.length === 0) {
            errorMassage.css({display: "block"});
            newText.css({borderColor: '#FF0000'})
            return;
        }

        var item = $("<li>");

        function setEditMode() {
            item.html("<input class='edit-text' type='text'>" +
                "<span class='buttons'>" +
                "<button class='ok-button' type='button'>&#10004;</button>" +
                "<button class='cancel-button' type='button'>&#8634;</button></span>");

            item.find('.edit-text').val(text);

            item.find('.ok-button').click(function () {
                var editTextElement = item.find('.edit-text');
                var editText = editTextElement.val();
                errorMassage.css({display: "none"});

                if (editText.length === 0) {
                    errorMassage.css({display: "block"});
                    editTextElement.css({borderColor: "#FF0000"});
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
            item.html("<span class='todo-text'></span>" +
                "<span class='buttons'>" +
                "<button class='delete-button' type='button'>&#10006;</button> " +
                "<button class='edit-button' type='button'>&#9998;</button></span>");

            item.find('.todo-text').text(text);

            item.find(".delete-button").click(function () {
                item.remove();
            });

            item.find('.edit-button').click(function () {
                setEditMode();
            });
        }

        setViewMode();

        todoList.append(item);
        newText.val("");
    });
});