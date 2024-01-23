function init() {
    var w = 600;
    var h = 300;
    var padding = 30;
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var dataset = [
        { apples: 5, oranges: 10, grapes: 22 },
        { apples: 4, oranges: 12, grapes: 28 },
        { apples: 2, oranges: 19, grapes: 32 },
        { apples: 7, oranges: 23, grapes: 35 },
        { apples: 23, oranges: 17, grapes: 43 }
    ];
    //Set up stack method
    var stack = d3.stack()
                    .keys(["apples", "oranges", "grapes"]);

    var series = stack(dataset);
    var xScale = d3.scaleBand() //xScale is not a straight number, it's a date
                .domain(d3.range(dataset.length))
                .range([0, w])
                .paddingInner([0.05]);
    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function(d) {
                        return d.apples + d.oranges + d.grapes;
                        })
                    ])
                    .range([h, 0]);
    //Set up the SVG and set up the arcs
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
    //Add a group for each row of data
    var groups = svg.selectAll("g")
                    .data(series)
                    .enter()
                    .append("g")
                    .style("fill", function(d, i) {
                        return color(i);
                    });
    //Add a rect for each data value
    var rects = groups.selectAll("rect")
                        .data(function(d) { return d; })
                        .enter()
                        .append("rect")
                        .attr("x", function(d, i) {
                            return xScale(i);
                        })
                        .attr("y", function(d, i) {
                            return yScale(d[1]);
                        })
                        .attr("width", xScale.bandwidth())
                        .attr("height", function(d) {
                            return yScale(d[0]) - yScale(d[1]);
                        })
                        .data(function(d) { return d; });
}
window.onload = init;
