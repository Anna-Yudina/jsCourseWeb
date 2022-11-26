(function () {
    var originalArray = [30, 5, 9, 1, 10, 16, 25, 3, 12, 7, 6, 17, 8, 22, 13];

    console.log("originalArray = " + originalArray);
    console.log("descendingSortArray = " + sortDescending(originalArray));
    console.log("fiveFirstElementsArray = " + getArrayFirstElements(originalArray));
    console.log("fiveLastElementsArray = " + getArrayLastFiveElements(originalArray));
    console.log("evenElementsSum = " + getEvenNumbersSum(originalArray));
    console.log("squareEvenNumbersArray = " + getSquaresEvenNumbersArray(createArray(100)));

    function sortDescending(array) {
        return array.sort(function (e1, e2) {
            return e2 - e1;
        });
    }

    function getArrayFirstElements(array) {
        return array.slice(0, 5);
    }

    function getArrayLastFiveElements(array) {
        return array.slice(array.length - 5);
    }

    function getEvenNumbersSum(array) {
        return array.filter(function (e) {
            return e % 2 === 0;
        }).reduce(function (sum, e) {
            return sum + e;
        }, 0);
    }

    function createArray(number) {
        var array = [];

        for (var i = 1; i <= number; i++) {
            array.push(i);
        }

        return array;
    }

    function getSquaresEvenNumbersArray(array) {
        return array.filter(function (e) {
            return e % 2 === 0;
        }).map(function (e) {
            return e * e;
        });
    }
})();