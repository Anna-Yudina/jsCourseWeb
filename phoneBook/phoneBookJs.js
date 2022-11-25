$(function () {
    var surnameElement = $("#input-surname");
    var nameElement = $("#input-name");
    var phoneNumberElement = $("#input-phone-number");
    var contactLines = $(".contact-lines");
    var saveButton = $("#save-button");
    var counter = 1;
    var errorMassage = $(".error-massage");
    var dialog = $("#dialog");
    var checkedItems = [];

    saveButton.click(function () {
        var item = $("<tr>");
        var surnameElementText = surnameElement.val().trim();
        var nameElementText = nameElement.val().trim();
        var phoneNumberElementText = phoneNumberElement.val().trim();

        errorMassage.css({display: "none"});
        surnameElement.css({border: "#767676 solid 1px"});
        nameElement.css({border: "#767676 solid 1px"});
        phoneNumberElement.css({border: "#767676 solid 1px"});

        if (checkInput(surnameElementText, nameElementText, phoneNumberElementText)) {
            return;
        }


        item.html("<td class='counter'></td>" +
            "<td class='new-surname'></td>" +
            "<td class='new-name'></td>" +
            "<td class='new-phone-number'></td>" +
            "<td><input type='checkbox' class='checkbox-flag'/></td>");

        item.find(".counter").text(counter);
        item.find(".new-surname").text(surnameElementText);
        item.find(".new-name").text(nameElementText);
        item.find(".new-phone-number").text(phoneNumberElementText);

        contactLines.append(item);
        surnameElement.val("");
        nameElement.val("");
        phoneNumberElement.val("");
        counter++;
    });

    function checkInput(surname, name, phoneNumber) {
        var errorMassageText = "";
        var isError = false;
        if (surname.length === 0 || name.length === 0 || phoneNumber.length === 0) {
            errorMassage.css({display: "block"});

            if (surname.length === 0) {
                surnameElement.css({border: "#d93242 solid 2px"});
                errorMassageText += "Заполните фамилию! ";
            }

            if (name.length === 0) {
                nameElement.css({border: "#d93242 solid 2px"});
                errorMassageText += "Заполните имя! ";
            }

            if (phoneNumber.length === 0) {
                phoneNumberElement.css({border: "#d93242 solid 2px"});
                errorMassageText += "Заполните телефон!";
            }

            errorMassage.text(errorMassageText);
            isError = true;
        } else {
            contactLines.find(".new-phone-number").each(function () {
                if ($(this).text() === phoneNumber) {
                    errorMassage.css({display: "block"});
                    errorMassage.text("Данный контакт уже зарегистрирован!");
                    isError = true;
                }
            })
        }

        return isError;
    }

    $(".delete-button").click(function () {
        contactLines.find('tr').each(function () {
            if ($(this).find(".checkbox-flag").prop('checked')) {
                checkedItems.push($(this));
            }
        });

        if (checkedItems.length !== 0 || checkedItems.length !== 0) {
            dialog.dialog("open");
        }
    });

    dialog.dialog({
        autoOpen: false,
        modal: true,
        buttons: [
            {
                text: "OK",
                click: function () {
                    checkedItems.forEach(function (el) {
                        el.remove();
                        counter--;
                    })

                    if (counter !== 0) {
                        contactLines.find(".counter").each(function (i) {
                            $(this).text(i + 1);
                        });
                    }

                    dialog.dialog("close");
                    checkedItems = [];
                    $("#all-selected-checkbox").prop('checked', false);
                }
            },
            {
                text: "Cancel",
                click: function () {
                    dialog.dialog("close");
                }
            }
        ]
    });

    $("#all-selected-checkbox").click(function () {
        if (this.checked) {
            $(".checkbox-flag").prop('checked', true);
        } else {
            $(".checkbox-flag").prop('checked', false);
        }
    });

    $(".filter input").on('keyup', function () {
        var filterText = $(this).val().toLowerCase();
        $('.contact-lines tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(filterText) > -1);
        });
    });
});