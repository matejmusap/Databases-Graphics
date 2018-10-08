d3.queue()
    .defer(d3.json, "./databases/other/cities/countries.json")
    .defer(d3.csv, "./databases/other/cities/simplemaps-worldcities-basic.csv", function(row) {
        return {
            cityName: row.city,
            countryCode: row.iso2,
            population: +row.pop
        }
    })
    .await(function(error, countries, cities) {
        if(error) throw error;
        var data = countries.geonames.map(country => {
            country.cities = cities.filter(city => city.countryCode === country.countryCode)
            return country;
        });
        var countrySelection = d3.select("body")
                                    .selectAll("div")
                                    .data(data)
                                    .enter()
                                    .append("div");
        countrySelection
            .append("h3")
                .text(d => d.countryName);
        countrySelection
            .append("ul")
            .html(d => d.cities.map(city => {
                var percentage = city.population / d.population * 100;
                return `<li>${city.cityName} - ${percentage.toFixed(2)} %</li>`
            }).join(""))
    });