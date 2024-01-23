function init(){
    var w = 500;
    var h = 100;
    var barPadding = 2;
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
                    .domain([d3.min(dataset, function(d) {
                        return d[0];
                    }),
                    d3.max(dataset, function(d) {
                        return d[0];
                    })]) //The data input range
                    .range([padding, w - padding]); //the range available for visualisation on screen


    var yscale = d3.scaleLinear()
                    .domain([d3.min(dataset, function(d) {
                        return d[1];
                    }),
                    d3.max(dataset, function(d) {
                        return d[1];
                    })]) //The data input range
                    .range([h - padding, padding]);

    var svg = d3.select("#dot")
                .append("svg")
                .attr("width", w+50)
                .attr("height", h+ padding+20);

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d, i) {
            return xscale(d[0]);
        })
        .attr("cy", function(d) {
            return yscale(d[1]) +10;
        })
        .attr("r", 5)
        .attr("fill", "#FFCEFE" );

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d[0] + "," + d[1];
        })
        .attr("x", function(d, i) {
            return xscale(d[0]+5);
        })
        .attr("y", function(d) {
            return yscale(d[1] +13
                );
        })
        .style("font-size", "12px");
}
window.onload = init;
