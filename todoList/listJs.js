document.addEventListener("DOMContentLoaded", function () {
    var todoList = document.getElementById("todo-list");
    var addButton = document.getElementById("add-button");
    var newText = document.getElementById("new-text");

    addButton.addEventListener("click", function (){
        var text = newText.value;

        if(text.length === 0){
            return;
        }

        var item = document.createElement("li");
        item.innerHTML = "<span class='todo-text'></span><button class='delete-button' type='button'></button>";
        item.querySelector('.todo-text').textContent = text;

        item.querySelector(".delete-button").addEventListener("click", function (){
            item.remove();
        })

        todoList.append(item);
        newText.value = "";
    })
});