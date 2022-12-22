document.addEventListener("DOMContentLoaded", function () {
    var celsiusTextItem = document.getElementById("celsius-text");
    var kelvinTextItem = document.getElementById("kelvin-text");
    var fahrenheitTextItem = document.getElementById("fahrenheit-text");

    var celsiusButtonItem = document.getElementById("celsius-button");
    var kelvinButtonItem = document.getElementById("kelvin-button");
    var fahrenheitButtonItem = document.getElementById("fahrenheit-button");

    var emptyErrorMessage = document.querySelector(".empty-error-message");
    var notNumberErrorMessage = document.querySelector(".not-number-error-message");

    function setInitialValues() {
        emptyErrorMessage.style.display = "none";
        notNumberErrorMessage.style.display = "none";
        celsiusTextItem.classList.remove("red-border");
        kelvinTextItem.classList.remove("red-border");
        fahrenheitTextItem.classList.remove("red-border");
    }

    function validate(temperatureText, temperatureTextItem) {
        var isError = false;

        if (temperatureText.length === 0) {
            emptyErrorMessage.style.display = "block";
            temperatureTextItem.classList.add("red-border");
            isError = true;
        } else if (isNaN(temperatureText)) {
            notNumberErrorMessage.style.display = "block";
            temperatureTextItem.classList.add("red-border");
            isError = true;
        }

        return isError;
    }

    celsiusButtonItem.addEventListener("click", function () {
        var celsiusText = celsiusTextItem.value.trim();

        setInitialValues();
        var isError = validate(celsiusText, celsiusTextItem);

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

        setInitialValues();
        var isError = validate(kelvinText, kelvinTextItem);

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

        setInitialValues();
        var isError = validate(fahrenheitText, fahrenheitTextItem);

        if (isError) {
            celsiusTextItem.value = "";
            kelvinTextItem.value = "";
            return;
        }

        celsiusTextItem.value = ((Number(fahrenheitText) - 32) / 1.8).toFixed(2);
        kelvinTextItem.value = ((Number(fahrenheitText) + 459.67) / 1.8).toFixed(2);
    });
});