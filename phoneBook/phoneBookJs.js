$(function () {
    var surnameElement = $("#inputSurname");
    var nameElement = $("#inputName");
    var phoneNumberElement = $("#inputPhoneNumber");
    var tbody = $(".tbody");
    var saveButton = $("#save-button");
    var counter = 1;
    var errorMassage = $(".error-massage");
    var dialog = $("#dialog");
    var itemForDelete = null;
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

        if (checkInput(surnameElementText, nameElementText, phoneNumberElementText)){
        return;
        }

        console.log("процесс прошел дальше")

        item.html("<td class='counter'></td>" +
            "<td class='newSurname'></td>" +
            "<td class='newName'></td>" +
            "<td class='newPhoneNumber'></td>" +
            "<td class='delete-button-cell'>" +
            "<input type='checkbox' class='checkbox-flag'/>" +
            "</td>");

        item.find(".counter").text(counter);
        item.find(".newSurname").text(surnameElementText);
        item.find(".newName").text(nameElementText);
        item.find(".newPhoneNumber").text(phoneNumberElementText);

        tbody.append(item);
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
                errorMassage.text(errorMassageText);
            }

            if (name.length === 0) {
                nameElement.css({border: "#d93242 solid 2px"});
                errorMassageText += "Заполните имя! ";
                errorMassage.text(errorMassageText);
            }

            if (phoneNumber.length === 0) {
                phoneNumberElement.css({border: "#d93242 solid 2px"});
                errorMassageText += "Заполните телефон!";
                errorMassage.text(errorMassageText);
            }

            isError = true;
        } else {
            tbody.find(".newPhoneNumber").each(function(){
                if ($(this).text() === phoneNumber){
                    errorMassage.css({display: "block"});
                    errorMassage.text("Данный контакт уже зарегистрирован!");
                    isError = true;
                }
            })
        }

        return isError;
    }

    $(".delete-button").click(function () {
        tbody.find('tr').each(function (){
                if($(this).find(".checkbox-flag").prop('checked')) {
                    checkedItems.push($(this));
                }
            });
       // tbody.find(".checkbox-flag").each(function(){
            // if($(this).prop('checked')){
            //     checkedItems.push($(this));
            // }

        console.log(checkedItems);
        if(checkedItems.length !== 0 || checkedItems.length !==0){
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
                    checkedItems.remove();
                        counter--;

                    if (counter !== 0) {
                        tbody.find(".counter").each(function (i) {
                            $(this).text(i + 1);
                        });
                    }

                    dialog.dialog("close");
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
})