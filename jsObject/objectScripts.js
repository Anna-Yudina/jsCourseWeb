(function () {
    var countriesObjectsArray = [
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
                {name: "Ливерпуль", population: 440000},
                {name: "Бристоль", population: 416000}
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

    function getCountriesMaxCountCities(array) {
        var max = Math.max.apply(null, array.map(function (item) {
            return item.cities.length;
        }));

        return array.filter(function (item) {
            return item.cities.length === max;
        });
    }

    function getCountriesPopulationArray(array) {
        var countriesPopulationArray = [];

        array.forEach(function (item, i) {
            countriesPopulationArray[i] = {
                name: array[i].name,
                population: array[i].cities.reduce(function (sum, item) {
                    return sum + item.population;
                }, 0)
            }
        })

        return countriesPopulationArray;
    }

    console.log(getCountriesPopulationArray(countriesObjectsArray))
    console.log(getCountriesMaxCountCities(countriesObjectsArray))
})()