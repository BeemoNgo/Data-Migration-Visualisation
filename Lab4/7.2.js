function init() {
    var w = 300;
    var h = 300;
    var padding = 30;
    var dataset = [5, 10, 20, 45, 6, 25];

    var pie = d3.pie();

    var outerRadius = w /2;
    var innerRadius = 0;
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);


    var svg = d3.select("#pie")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
    //Set up group
    var arcs = svg.selectAll("g.arc")
                    .data(pie(dataset))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
        //Draw arc paths
        arcs.append("path")
            .attr("fill", function(d, i) {
                return color(i);
            })
            .attr("d", function(d, i) {
                return arc(d, i);
            });

        arcs.append("text")
            .attr("transform", function(d) {
                return "translate(" + arc.centroid(d) + ")"; // finds the middle of an irregular shape
            })
            .attr("text-anchor", "middle")
            .text(function(d) {
                return d.value;
            });


}
window.onload = init;
