function init(){
    var w = 500;
    var h = 300;
    var barPadding = 1;
    var padding = 30;
    var dataset = [
                    [5, 20],
                    [480, 90],
                    [250, 50],
                    [100, 33],
                    [330, 95],
                    [410, 12],
                    [475, 44],
                    [25, 67],
                    [85, 21],
                    [220, 88]
                    ];

    var xscale = d3.scaleLinear()
                    .domain([0,
                    d3.max(dataset, function(d) {
                        return d[0];
                    })]) //The data input range
                    .range([padding, w - padding]);


    var yscale = d3.scaleLinear()
                    .domain([0,
                    d3.max(dataset, function(d) {
                        return d[1];
                    })]) //The data input range
                    .range([h - padding, padding]);

    var xAxis = d3.axisBottom()
                    .scale(xscale);

    var yAxis = d3.axisLeft()
                    .scale(yscale);


    var svg = d3.select("#dot")
                .append("svg")
                .attr("width", w+padding)
                .attr("height", h+padding);



    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d, i) {
            return xscale(d[0]) ;
        })
        .attr("cy", function(d) {
            return yscale(d[1]);
        })
        .attr("r", 3)
        .attr("fill", "slategrey" );

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d[0] + "," + d[1];
        })
        .attr("x", function(d, i) {
            return xscale(d[0]) +5;
        })
        .attr("y", function(d) {
            return yscale(d[1]);
        })
        .style("font-size", "14px");

        svg.append("g")
            .attr("transform", "translate(0, " + (h - padding) +")")
            .call(xAxis);

        svg.append("g")
            .attr("transform", `translate(${padding}, 0)`)
            .call(yAxis);
}
window.onload = init;
