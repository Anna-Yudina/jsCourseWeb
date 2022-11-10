let obj = {
    name: "Россия",
    cities: [
        {name: "Новосибирк", population: 1650000},
        {name: "Кемерово", population: 550000},
        {name: "Томск", population: 574000}
    ]
}

let obj2 = []

for (var key in obj) {
    var value = obj[key];
    if (key === 'name') {
        obj2[key] = value;
    }
    if (key === 'cities'){
        obj2['populationSum'] = obj.cities.reduce(function(sum, item){
            return sum + item.population;
        }, 0);
    }
}

console.log(obj2)

