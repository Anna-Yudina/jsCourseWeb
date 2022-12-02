$(function () {
    var getAnswerButton = $(".get-answer");
    var answer1 = $(".answer1");
    var answer2 = $(".answer2");
    var answer3 = $(".answer3");
    var answer4 = $(".answer4");

    var people = [
        {name: "Ivan", age: 20},
        {name: "Petr", age: 30},
        {name: "Den", age: 17},
        {name: "Svetlana", age: 35},
        {name: "Konstantin", age: 16},
        {name: "Egor", age: 18},
        {name: "Bob", age: 32},
        {name: "Ivan", age: 25},
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

    var sortPeopleFrom20To30 = _.chain(people)
        .filter(function (p) {
            return p.age >= 20 && p.age <= 30;
        })
        .sortBy('age')
        .value();

    var descendingSortPeopleNameFrom20To30 = _.chain(people)
        .filter(function (p) {
            return p.age >= 20 && p.age <= 30;
        })
        .sortBy('name')
        .pluck("name")
        .unique()
        .reverse()
        .value();

    var nameAndCountObject = _.chain(people)
        .countBy("name")
        .value();

    getAnswerButton.click(function () {
        answer1.append(peopleAverageAge);
        answer2.append(JSON.stringify(sortPeopleFrom20To30));
        answer3.append(descendingSortPeopleNameFrom20To30.join(", "));
        answer4.append(JSON.stringify(nameAndCountObject));
    });
});