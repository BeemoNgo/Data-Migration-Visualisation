function init() {
    var w = 500;
    var h = 300;

    var projection = d3.geoMercator()
                        .center([145, -36.5])
                        .translate([w / 2, h / 2])
                        .scale(2450);

    var path = d3.geoPath()
                .projection(projection); //convert from latitude/longitude co-ordinates to x & y co-ordinates

    var color = d3.scaleQuantize()
                    .range(["#f1eef6", "#d7b5d8", "#df65b0", "#dd1c77", "#980043"]);

    //var formatAsThousands = d3.format(",");

    var svg = d3 .select("#chart")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .attr("fill", "grey");

    d3.csv("VIC_LGA_unemployment.csv").then((data) => { //load in the data
        color.domain([
            d3.min(data, (d) => d.unemployed),
            d3.max(data, (d) => d.unemployed),
        ]);

        d3.json("LGA_VIC.json").then(function(json) { //Merge the csv data and GeoJSON
            //Loop through once for each ag. data value
            for (var i  = 0; i < data.length; i++) {
                //Grab state name
                var dataState = data[i].LGA;

                //Grab data value, and convert from string to float
                var dataValue = parseFloat(data[i].unemployed);

                //Find the corresponding state inside the GeoJSON
                for (var j = 0; j < json.features.length; j++) {
                    var jsonState =
                        json.features[j].properties.LGA_name;

                    if (dataState == jsonState) {
                        //Copy the data value into the JSON
                        json.features[j].properties.value = dataValue;

                        //Stop looking through the JSON
                        break;
                    }
                }
            }

            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", function(d) {
                    //Get data value
                    var value = d.properties.value;

                    if (value) {
                        //If value exists…
                        return color(value);
                    } else {
                        //If value is undefined…
                        return "#CCC";
                    }
                });

            d3.csv("VIC_city.CSV").then((data) => { //load in map color domain
                svg.selectAll("circle") //mark town and city
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d) {
                        return projection([d.lon, d.lat])[0]; //longtitude x and latitude y
                    })
                    .attr("cy", function(d) {
                        return projection([d.lon, d.lat])[1];
                    })
                    .attr("r", 3)
                    .style("fill", "lightgreen")
                    .style("stroke", "black")
                    .style("stroke-width", 0.25)
                    .style("opacity", 0.75);


                svg.selectAll("text") //add town and city names
                    .data(data)
                    .enter()
                    .append("text")
                    .attr("x", function(d) {
                        return projection([d.lon, d.lat])[0];
                    })
                    .attr("y", function(d) {
                        return projection([d.lon, d.lat])[1];
                    }) //Simple tooltip
                    .text(function(d) {
                        return d.place;
                    });
            });
        });
    });
}
window.onload = init;
