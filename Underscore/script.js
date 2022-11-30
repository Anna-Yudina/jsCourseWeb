$(function () {
    var button = $(".button");
    var shadow = $(".shadow");
    var answer1 = $(".answer1");

    button.click(function () {
        shadow.css({display: 'block'});
    });

    var people = [
        {name: "Ivan", age: 20},
        {name: "Petr", age: 30},
        {name: "Semen", age: 17},
        {name: "Svetlana", age: 35},
        {name: "Konstantin", age: 16},
        {name: "Egor", age: 18},
        {name: "Bob", age: 32},
        {name: "Tom", age: 40},
        {name: "Sergey", age: 46},
        {name: "Nik", age: 38},
        {name: "Den", age: 27},
        {name: "Max", age: 34}
    ];

    var peopleAverageAge = _.chain(people)
        .pluck("age")
        .reduce(function (memo, item) {
            return memo + item / _.size(people)
        }, 0)
        .value()
        .toFixed(1);

    answer1.append(peopleAverageAge);
});