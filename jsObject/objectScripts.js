(function () {
    var countries = [
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
    ];

    function getCountriesWithMaxCitiesCount(countries) {
        var maxCitiesCount = Math.max.apply(null, countries.map(function (country) {
            return country.cities.length;
        }));

        return countries.filter(function (country) {
            return country.cities.length === maxCitiesCount;
        });
    }

    function getCountriesPopulation(countries) {
        var countriesPopulation = {};

        countries.forEach(function (country) {
            countriesPopulation[country.name] = country.cities.reduce(function (sum, city) {
                return sum + city.population;
            }, 0);
        });

        return countriesPopulation;
    }

    console.log(getCountriesPopulation(countries));
    console.log(getCountriesWithMaxCitiesCount(countries));
})();