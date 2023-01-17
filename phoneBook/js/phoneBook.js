$(function () {
    var surnameInput = $("#input-surname");
    var nameInput = $("#input-name");
    var phoneNumberInput = $("#input-phone-number");
    var contactsRows = $(".contacts-rows");
    var saveButton = $("#save-button");
    var surnameErrorMessage = $(".surname-error-message");
    var nameErrorMessage = $(".name-error-message");
    var phoneNumberErrorMessage = $(".phone-number-error-message");
    var deleteConfirmationDialogElement = $("#delete-confirmation-dialog");
    var searchButton = $("#search");
    var checkedItems = [];
    var deletedItem;

    saveButton.click(function () {
        var item = $("<tr>");
        var surnameInputText = surnameInput.val().trim();
        var nameInputText = nameInput.val().trim();
        var phoneNumberInputText = phoneNumberInput.val().trim();

        surnameErrorMessage.css("visibility", "hidden");
        nameErrorMessage.css("visibility", "hidden");
        phoneNumberErrorMessage.css("visibility", "hidden");
        surnameInput.removeClass("red-border");
        nameInput.removeClass("red-border");
        phoneNumberInput.removeClass("red-border");

        if (checkInputDataForNotEmpty(surnameInputText, nameInputText, phoneNumberInputText)) {
            return;
        }

        if (checkInputPhoneForNotRepeat(phoneNumberInputText)) {
            return;
        }

        item.html("<td><input type='checkbox' class='checkbox-flag'/></td>" +
            "<td class='counter'></td>" +
            "<td class='surname'></td>" +
            "<td class='name'></td>" +
            "<td class='phone-number'></td>" +
            "<td><button class='delete-button' type='button' title='Удаление'>&#10006;</button></td>");

        item.find(".delete-button").click(function () {
            deletedItem = $(this).closest("tr");
            deleteConfirmationDialogElement.dialog("open");
        });

        item.find(".surname").text(surnameInputText);
        item.find(".name").text(nameInputText);
        item.find(".phone-number").text(phoneNumberInputText);

        contactsRows.append(item);
        surnameInput.val("");
        nameInput.val("");
        phoneNumberInput.val("");

        setTableNumbering();
    });

    function checkInputDataForNotEmpty(surname, name, phoneNumber) {
        var isError = false;

        if (surname.length === 0) {
            surnameErrorMessage.css("visibility", "visible");
            surnameInput.addClass("red-border");
            surnameErrorMessage.text("Заполните фамилию!");
            isError = true;
        }

        if (name.length === 0) {
            nameInput.addClass("red-border");
            nameErrorMessage.css("visibility", "visible");
            nameErrorMessage.text("Заполните имя!");
            isError = true;
        }

        if (phoneNumber.length === 0) {
            phoneNumberInput.addClass("red-border");
            phoneNumberErrorMessage.css("visibility", "visible");
            phoneNumberErrorMessage.text("Заполните телефон!");
            isError = true;
        }

        return isError;
    }

    function checkInputPhoneForNotRepeat(phoneNumber) {
        var isError = false;

        contactsRows.find(".phone-number").each(function () {
            if ($(this).text() === phoneNumber) {
                phoneNumberErrorMessage.css("visibility", "visible");
                phoneNumberInput.addClass("red-border");
                phoneNumberErrorMessage.text("Данный номер уже зарегистрирован!");
                isError = true;
                return false;
            }
        });

        return isError;
    }


    $(".delete-selected-button").click(function () {
        contactsRows.find("tr").each(function () {
            if ($(this).find(".checkbox-flag").prop("checked")) {
                checkedItems.push($(this));
            }
        });

        if (checkedItems.length !== 0) {
            deleteConfirmationDialogElement.dialog("open");
        }
    });

    deleteConfirmationDialogElement.dialog({
        autoOpen: false,
        modal: true,
        buttons: [
            {
                text: "OK",
                click: function () {
                    if (checkedItems.length === 0) {
                        deletedItem.remove();
                        setTableNumbering();
                        deleteConfirmationDialogElement.dialog("close");
                    } else {
                        checkedItems.forEach(function (el) {
                            el.remove();
                        });

                        setTableNumbering();

                        deleteConfirmationDialogElement.dialog("close");
                        checkedItems = [];
                        $("#all-selected-checkbox").prop("checked", false);
                    }
                }
            },
            {
                text: "Отмена",
                click: function () {
                    deleteConfirmationDialogElement.dialog("close");
                    checkedItems = [];
                }
            }
        ]
    });

    $("#all-selected-checkbox").click(function () {
        $(".checkbox-flag").prop("checked", this.checked);
    });

    searchButton.click(function () {
        var allContacts = $(".contacts-rows tr");
        var filterText = $("#search-input").val().toLowerCase().trim();

        allContacts.show();

        allContacts.each(function () {
            if (($(this).text().toLowerCase().indexOf(filterText) <= -1)) {
                $(this).hide();
                $(this).find(".checkbox-flag").prop("checked", false);
            }
        });
    });

    function setTableNumbering() {
        $(".contacts-rows tr").each(function (i) {
            var number = i + 1;
            $(this).find("td:nth-child(2)").text(number + ".");
        });
    }
});