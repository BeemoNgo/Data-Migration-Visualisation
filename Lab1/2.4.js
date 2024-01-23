function init(){ //create separate javascript files
    var w = 500;
    var h = 100;
    var barPadding = 1;
    var barChart = function(data) {
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
        // Use a value to pick a color.
    var colorPicker =  function(v) {
            if (v<10) {
                return "#D9ACF5";
            } else  if (v >= 10) {
                return "#FFCEFE";
            }
        }

    svg.selectAll("rect") //create chart
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d, i) {
                return i * (w / data.length);
            })
            .attr("y", function(d) {
                return h - (d.wombats * 4);
            })
            .attr("width", w / data.length - barPadding)
            .attr("height", function(d) {
                return d.wombats*4;
            })
            .attr("fill", function(d) {
                return colorPicker(d.wombats);
                 // call the color picker to get the fill.
            });
    }

    d3.csv("Task_2.4_data.csv").then(function(data) { //reading the data
            console.log(data);
            wombatSightings = data;

            barChart(wombatSightings);
        });



}
window.onload = init;
