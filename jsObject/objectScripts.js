// Создайте массив объектов-стран (пусть будет несколько
// стран)
// • У страны есть название и список городов (пусть будет по
// несколько городов)
// • У города есть название и численность населения
// • Найдите страну/страны с максимальным количеством
// городов
// • Получите объект с информацией по всем странам такого
// вида: ключ – название страны, значение – суммарная
// численность по стране
// • Оформите код в виде функций

let countriesObjectsArray = [
    {
        name: "Россия",
        cities: [
            {name: "Новосибирк", population: 1650000},
            {name: "Кемерово", population: 550000},
            {name: "Томск", population: 574000}
        ]
    },
    {
        name: "Англия",
        cities: [
            {name: "Лондон", population: 8150000},
            {name: "Манчестер", population: 502000},
            {name: "Ливерпуль", population: 440000}
           // {name: "Бристоль", population: 416000}
        ]
    },
    {
        name: "Казахстан",
        cities: [
            {name: "Астана", population: 1200000},
            {name: "Караганда", population: 500000},
            {name: "Павлодар", population: 360000}
        ]
    },
    {
        name: "Тайланд",
        cities: [
            {name: "Бангкок", population: 5600000},
            {name: "Паттайя", population: 119000}
        ]
    }
]

// не правильно отрабатывает функция, ищет только единственный объект
function getCountriesMaxCountCities(object) {
    var sortObject = object.sort(function (elem1, elem2) {
        return elem2.cities.length - elem1.cities.length;
    })
    return sortObject.find(function (elem) {
        var max = sortObject[0].cities.length;

        if (elem.cities.length === max)
            return elem
    })
}

function getCountriesPopulationArray(object) {
    var countriesPopulationArray = []

    for (var i = 0; i < object.length; i++) {
        countriesPopulationArray[i] = {}
        countriesPopulationArray[i].name = object[i].name
        countriesPopulationArray[i].population = object[i].cities.reduce(function (sum, item) {
            return sum + item.population;
        }, 0);
    }

    return countriesPopulationArray;
}

console.log(getCountriesPopulationArray(countriesObjectsArray))
console.log(getCountriesMaxCountCities(countriesObjectsArray))