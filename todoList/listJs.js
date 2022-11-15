document.addEventListener("DOMContentLoaded", function () {
    var todoList = document.getElementById("todo-list");
    var addButton = document.getElementById("add-button");
    var newText = document.getElementById("new-text");
    var errorMassage = document.querySelector(".error-massage");

    addButton.addEventListener("click", function () {
        var text = newText.value;

        errorMassage.style.display = "none";

        if (text.length === 0) {
            errorMassage.style.display = "block";
            return;
        }

        var item = document.createElement("li");

        function setEditMode() {
            item.innerHTML = "<input class='edit-text' type='text'>" +
                "<span class='button-span'>" +
                "<button class='ok-button' type='button'>&#10004;</button>" +
                "<button class='cancel-button' type='button'>&#8634;</button></span>";

            item.querySelector('.edit-text').value = text;

            item.querySelector('.ok-button').addEventListener("click", function () {
                newText = item.querySelector('.edit-text').value;

                if (newText.length === 0) {
                    return;
                }

                text = item.querySelector('.edit-text').value;
                setViewMode();
            });

            item.querySelector('.cancel-button').addEventListener("click", function () {
                setViewMode();
            });
        }

        function setViewMode() {
            item.innerHTML = "<span class='todo-text'></span>" +
                "<span class='button-span'>" +
                "<button class='delete-button' type='button'>&#10006;</button> " +
                "<button class='edit-button' type='button'>&#9998;</button></span>";

            item.querySelector('.todo-text').textContent = text;

            item.querySelector(".delete-button").addEventListener("click", function () {
                item.remove();
            });

            item.querySelector('.edit-button').addEventListener("click", function () {
                setEditMode();
            });
        }

        setViewMode();

        todoList.append(item);
        newText.value = "";
    });
});