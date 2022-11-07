var originalArray = [30, 5, 9, 1, 10, 16, 25, 3, 12, 7, 6, 17, 8, 22, 13];

console.log("originalArray = " + originalArray);
console.log("descendingSortArray = " + descendingSort(originalArray));
console.log("fiveFirstElementsArray = " + getArrayFiveFirstElements(originalArray));
console.log("fiveLastElementsArray = " + getArrayFiveLastElements(originalArray));
console.log("eventElementsSum = " + getSumEvenNumbers(originalArray));
console.log("squareEvenNumbersArray = " + getArraySquareEvenNumbers(createArray(100)));

function descendingSort(array) {
    return array.sort(function (e1, e2) {
        return e2 - e1;
    });
}

function getArrayFiveFirstElements(array) {
    return array.slice(0, 5);
}

function getArrayFiveLastElements(array) {
    return array.slice(array.length - 5);
}

function getSumEvenNumbers(array) {
    return array.filter(elem => elem % 2 === 0).reduce((sum, elem) => sum + elem)
}

function createArray(number) {
    var array = [];

    for (var i = 1; i <= number; i++) {
        array.push(i)
    }

    return array;
}

function getArraySquareEvenNumbers(array) {
    return array.filter(elem => elem % 2 === 0).map(elem => elem * elem)
}