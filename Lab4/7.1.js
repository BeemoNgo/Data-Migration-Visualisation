function init() {
    var w = 600;
    var h = 300;
    var padding = 60;
    var data1;

    // var y = d3.scaleLinear()
    //             .domain([0, d3.max(dataset)]) //The data input range
    //             .range([h - 20, 0]);
    function lineChart(dataset) {
        xScale = d3.scaleTime() //xScale is not a straight number, it's a date
                .domain([
                    d3.min(dataset, function(d) { return d.date; }),
                    d3.max(dataset, function(d) { return d.date; })
                ])
                .range([60, w]);

        yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d) { return d.number; })
                ])
                .range([h, 20]);

        //Set up the line
        line = d3.line()
                .x(function(d) { return xScale(d.date); })
                .y(function(d) { return yScale(d.number); });

        line1 = d3.line()
                .x(function(d) { return xScale(d.date); })
                .y(function(d) { return yScale(d.number); });

        //Set up the SVG and Path
        var svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", w )
                    .attr("height", h + 20);

            svg.append("path")
                    .datum(dataset) //bind each single data
                    .attr("class", "line")
                    .attr("d", line);

        var xAxis = d3.axisBottom()
                        .scale(xScale);

        var yAxis = d3.axisLeft()
                       .scale(yScale);

            svg.append("g")
                .attr("transform", "translate(0, " + h +")")
                .call(xAxis);

            svg.append("g")
                .attr("transform", `translate(${padding}, 0)`)
                .call(yAxis);

            area = d3.area()
                .x(function (d) { return xScale(d.date); })
                //base line for area shape
                .y0(function (d) { return yScale.range()[0]; })
                .y1(function (d) { return yScale(d.number); });

            svg.append("path")
                .datum(dataset) //bind each single data
                .attr("class", "area")
                .attr("d", area)
                .attr("fill", "grey");

        svg.append("line")
            .attr("class", "line halfMilMark")
            //start of line
            .attr("x1", padding )
            .attr("y1", yScale(500000))
            //end of line
            .attr("x2", w)
            .attr("y2", yScale(500000));

        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", padding + 10)
            .attr("y", yScale(500000) - 7)
            .text("Half a million unemployed")
            .style("fill", "red");


    }

    //Set up the Scale

    d3.csv("Unemployment_78-95.csv", function(d) {
        return {
            date: new Date(+ d.year, + d.month-1), // -1 because JS's month counting starts at 0
            number: + d.number

        }
    })
    .then( function(data) { //load the data into data set
        data1= data;
        lineChart(data1);
    });
}
window.onload = init;
