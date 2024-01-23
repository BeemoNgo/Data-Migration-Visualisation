function init(){
    var w = 600;
    var h = 200;
    var barPadding = 1;
    var padding = 30;
    var dataset = [14, 5, 25, 23, 9, 11, 13, 15, 7];

    var xScale = d3.scaleBand() //Ordinal scale
                    .domain(d3.range(dataset.length)) //sets the input domain for the scale
                    .rangeRound([0, w]) //enables rounding of the range
                    .paddingInner(0.05);

    var yScale = d3.scaleLinear()
					.domain([0, d3.max(dataset)]) //sets the upper end of the input domain to the largest data value in dataset
					.range([0, h]);

    var svg = d3.select("#chart") //Create svg element
				.append("svg")
				.attr("width", w)
				.attr("height", h);

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) { // position in x-axis
            return xScale(i); // we will pass the values from the dataset
        })
        .attr("y", function(d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth()) //Asks for the bandwith of the scale
        .attr("height", function(d) {
            return yScale(d);
        })
        .attr("fill", "#f1a2ab"); //Change the color of the bar depending on the value

    //On click, update with new data
    d3.selectAll("button")
        .on("click", function() {
            var buttonID = d3.select(this).attr("id");

            if (buttonID == "btadd") { //Add a new data
                var newNumber = Math.floor(Math.random() * 25) + 1;  //New random integer (1-25)
                dataset.push(newNumber); //Add new number to array
                //Update scale domains
                xScale.domain(d3.range(dataset.length));
                yScale.domain([0,d3.max(dataset)]);

                var bars = svg.selectAll("rect") //rebinds the existing rects
                                .data(dataset)

                //New bar
                bars.enter() //add extra new element
                    .append("rect")
                    .attr("x", w)
                    .attr("y", function(d) {
                        return h - yScale(d);
                    })
                    .attr("width", xScale.bandwidth()) //Asks for the bandwith of the scale
                    .attr("height", function(d) {
                        return yScale(d);
                    })
                    .attr("fill", "#f1a2ab")
                    .merge(bars)
                    .transition()
                    .duration(500)
                    .attr("x", function(d, i) {
                        return xScale(i); //Update the x value
                    })
                    .attr("y", function(d) {
                        return h - yScale(d);
                    })
                    .attr("width", xScale.bandwidth()) //update the width value
                    .attr("height", function(d) {
                        return yScale(d);
                    });
            } else if (buttonID == "btremove") {
                dataset.shift();
                //Remove a value
                var bars = svg.selectAll("rect") //rebinds the existing rects
                            .data(dataset)
                bars.exit() //remove the needed element
                    .transition() //add transition to removing bars
                    .duration(500)
                    .attr("x", w)
                    .remove();
                xScale.domain(d3.range(dataset.length));
                yScale.domain([0,d3.max(dataset)]);
                var bars = svg.selectAll("rect")
                    .data(dataset);

                //New bar
                bars.enter() //add extra new element
                    .append("rect")
                    .attr("x", w)
                    .attr("y", function(d) {
                        return h - yScale(d);
                    })
                    .attr("width", xScale.bandwidth()) //Asks for the bandwith of the scale
                    .attr("height", function(d) {
                        return yScale(d);
                    })
                    .attr("fill", "#f1a2ab")
                    .merge(bars)
                    .transition()
                    .duration(500)
                    .attr("x", function(d, i) {
                        return xScale(i); //Update the x value
                    })
                    .attr("y", function(d) {
                        return h - yScale(d);
                    })
                    .attr("width", xScale.bandwidth()) //update the width value
                    .attr("height", function(d) {
                        return yScale(d);
                    });
            }
    })

}
window.onload = init;
