$(function () {
    var surnameInput = $("#input-surname");
    var nameInput = $("#input-name");
    var phoneNumberInput = $("#input-phone-number");
    var contactsRows = $(".contacts-rows");
    var saveButton = $("#save-button");
    var surnameErrorMessage = $(".surname-error-message");
    var nameErrorMessage = $(".name-error-message");
    var phoneNumberErrorMessage = $(".phone-number-error-message");
    var confirmationDeleteDialogElement = $("#confirmation-delete-dialog");
    var checkedItems = [];
    var deleteItem;

    saveButton.click(function () {
        var item = $("<tr>");
        var surnameInputText = surnameInput.val().trim();
        var nameInputText = nameInput.val().trim();
        var phoneNumberInputText = phoneNumberInput.val().trim();

        surnameErrorMessage.hide();
        nameErrorMessage.hide();
        phoneNumberErrorMessage.hide();
        surnameInput.removeClass("red-border");
        nameInput.removeClass("red-border");
        phoneNumberInput.removeClass("red-border");

        if (checkInput(surnameInputText, nameInputText, phoneNumberInputText)) {
            return;
        }

        item.html("<td><input type='checkbox' class='checkbox-flag'/></td>" +
            "<td class='counter'></td>" +
            "<td class='new-surname'></td>" +
            "<td class='new-name'></td>" +
            "<td class='new-phone-number'></td>" +
            "<td><button class='delete-button' type='button'>&#10006;</button></td>");

        item.find(".new-surname").text(surnameInputText);
        item.find(".new-name").text(nameInputText);
        item.find(".new-phone-number").text(phoneNumberInputText);

        contactsRows.append(item);
        surnameInput.val("");
        nameInput.val("");
        phoneNumberInput.val("");

        $(".delete-button").click(function () {
            deleteItem = $(this).closest("tr");
            confirmationDeleteDialogElement.dialog("open");
        });

        setTableNumbering();
    });

    function checkInput(surname, name, phoneNumber) {
        var isError = false;

        if (surname.length === 0 || name.length === 0 || phoneNumber.length === 0) {
            if (surname.length === 0) {
                surnameErrorMessage.show();
                surnameInput.addClass("red-border");
                surnameErrorMessage.text("Заполните фамилию!");
            }

            if (name.length === 0) {
                nameInput.addClass("red-border");
                nameErrorMessage.show();
                nameErrorMessage.text("Заполните имя!");
            }

            if (phoneNumber.length === 0) {
                phoneNumberInput.addClass("red-border");
                phoneNumberErrorMessage.show();
                phoneNumberErrorMessage.text("Заполните телефон!");
            }

            isError = true;
        } else {
            contactsRows.find(".new-phone-number").each(function () {
                if ($(this).text() === phoneNumber) {
                    phoneNumberErrorMessage.show();
                    phoneNumberInput.addClass("red-border");
                    phoneNumberErrorMessage.text("Данный номер уже зарегистрирован!");
                    isError = true;
                }
            });
        }

        return isError;
    }

    $(".selected-delete-button").click(function () {
        contactsRows.find("tr").each(function () {
            if ($(this).find(".checkbox-flag").prop("checked")) {
                checkedItems.push($(this));
            }
        });

        if (checkedItems.length !== 0) {
            confirmationDeleteDialogElement.dialog("open");
        }
    });

    confirmationDeleteDialogElement.dialog({
        autoOpen: false,
        modal: true,
        buttons: [
            {
                text: "OK",
                click: function () {
                    if (checkedItems.length === 0){
                        deleteItem.remove();
                        setTableNumbering();
                        confirmationDeleteDialogElement.dialog("close");
                    } else{
                        checkedItems.forEach(function (el) {
                            el.remove();
                        });

                        setTableNumbering();

                        confirmationDeleteDialogElement.dialog("close");
                        checkedItems = [];
                        $("#all-selected-checkbox").prop("checked", false);
                    }
                }
            },
            {
                text: "Отмена",
                click: function () {
                    confirmationDeleteDialogElement.dialog("close");
                    checkedItems = [];
                    console.log(checkedItems);
                }
            }
        ]
    });

    $("#all-selected-checkbox").click(function () {
        this.checked ? $(".checkbox-flag").prop("checked", true) : $(".checkbox-flag").prop("checked", false);
    });

    $(".filter input").on("keyup", function () {
        var filterText = $(this).val().toLowerCase();
        $('.contacts-rows tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(filterText) > -1);
        });
    });

    function setTableNumbering() {
        $(".contacts-rows tr").each(function (i) {
            var number = i + 1;
            $(this).find("td:nth-child(2)").text(number + ".");
        });
    }
});