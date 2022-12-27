$(function () {
    var getAnswerButton = $(".get-answer");
    var answer1 = $(".answer-1");
    var answer2 = $(".answer-2");
    var answer3 = $(".answer-3");
    var answer4 = $(".answer-4");

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
        {name: "Ivan", age: 34}
    ];

    var peopleAverageAge = (_.chain(people)
        .pluck("age")
        .reduce(function (accumulatedAge, age) {
            return accumulatedAge + age
        }, 0)
        .value()) / _.size(people)


    var from20To30SortedPeople = _.chain(people)
        .filter(function (p) {
            return p.age >= 20 && p.age <= 30;
        })
        .sortBy("age")
        .value();

    var from20To30DescendingSortedPeopleNames = _.chain(people)
        .filter(function (p) {
            return p.age >= 20 && p.age <= 30;
        })
        .pluck("name")
        .uniq()
        .sortBy()
        .reverse()
        .value();

    var countNamesObject = _.countBy(people, "name");

    getAnswerButton.click(function () {
        answer1.append(peopleAverageAge.toFixed(1));
        answer2.append(JSON.stringify(from20To30SortedPeople));
        answer3.append(from20To30DescendingSortedPeopleNames.join(", "));
        answer4.append(JSON.stringify(countNamesObject));
    });
});