document.addEventListener("DOMContentLoaded", function () {
    var celsiusTextItem = document.getElementById("celsiusText");
    var kelvinTextItem = document.getElementById("kelvinText");
    var fahrenheitTextItem = document.getElementById("fahrenheitText");

    var celsiusButtonItem = document.getElementById("celsiusButton");
    var kelvinButtonItem = document.getElementById("kelvinButton");
    var fahrenheitButtonItem = document.getElementById("fahrenheitButton");

    var nullErrorMassage = document.querySelector(".null-error-massage");
    var notNumberErrorMassage = document.querySelector(".not-number-error-massage");

    function returnStartValue() {
        nullErrorMassage.style.display = "none";
        notNumberErrorMassage.style.display = "none";
        celsiusTextItem.style.borderColor = "#000";
        kelvinTextItem.style.borderColor = "#000";
        fahrenheitTextItem.style.borderColor = "#000";
    }

    function executeValidation(temperatureText, temperatureTextItem) {
        var isError = false;

        if (temperatureText.length === 0) {
            nullErrorMassage.style.display = "block";
            temperatureTextItem.style.borderColor = "#FF0000";
            isError = true;
        } else if (String(parseFloat(temperatureText)) !== String(temperatureText)) {
            notNumberErrorMassage.style.display = "block";
            temperatureTextItem.style.borderColor = "#FF0000";
            isError = true;
        }

        return isError;
    }

    celsiusButtonItem.addEventListener("click", function () {
        var celsiusText = celsiusTextItem.value.trim();

        returnStartValue();
        var isError = executeValidation(celsiusText, celsiusTextItem);

        if (isError) {
            kelvinTextItem.value = "";
            fahrenheitTextItem.value = "";
            return;
        }

        kelvinTextItem.value = (273.15 + Number(celsiusText)).toFixed(2);
        fahrenheitTextItem.value = (9 * Number(celsiusText) / 5 + 32).toFixed(2);
    });

    kelvinButtonItem.addEventListener("click", function () {
        var kelvinText = kelvinTextItem.value.trim();

        returnStartValue();
        var isError = executeValidation(kelvinText, kelvinTextItem);

        if (isError) {
            celsiusTextItem.value = "";
            fahrenheitTextItem.value = "";
            return;
        }

        celsiusTextItem.value = (Number(kelvinText) - 273.15).toFixed(2);
        fahrenheitTextItem.value = (Number(kelvinText) * 1.8 - 459.67).toFixed(2);
    });

    fahrenheitButtonItem.addEventListener("click", function () {
        var fahrenheitText = fahrenheitTextItem.value.trim();

        returnStartValue();
        var isError = executeValidation(fahrenheitText, fahrenheitTextItem);

        if (isError) {
            celsiusTextItem.value = "";
            kelvinTextItem.value = "";
            return;
        }

        celsiusTextItem.value = ((Number(fahrenheitText) - 32) / 1.8).toFixed(2);
        kelvinTextItem.value = ((Number(fahrenheitText) + 459.67) / 1.8).toFixed(2);
    });
});