function init(){
    var w = 600;
    var h = 200;
    var barPadding = 1;
    var padding = 30;
    var maxValue = 25;
    var dataset = [14, 5, 25, 23, 9, 11, 13, 15, 7];

    var xScale = d3.scaleBand() //Ordinal scale
                    .domain(d3.range(dataset.length)) //sets the input domain for the scale
                    .rangeRound([30, w]) //enables rounding of the range
                    .paddingInner(0.05);

    var x = d3.scaleBand()
                .domain(["A", "B", "C", "D", "E", "F", "G", "H", "I"])
                .rangeRound([30, w])
                .paddingInner([0.05]);

    var yScale = d3.scaleLinear()
					.domain([0, d3.max(dataset)]) //sets the upper end of the input domain to the largest data value in dataset
					.range([0, h]);

    var y = d3.scaleLinear()
                .domain([0, d3.max(dataset)]) //The data input range
                .range([h - 20, 0]);

    var xAxis = d3.axisBottom()
                    .scale(x);

    var yAxis = d3.axisLeft()
                    .scale(y);

    var svg = d3.select("#chart")
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
            return h - yScale(d) - 20;
        })
        .attr("width", xScale.bandwidth()) //Asks for the bandwith of the scale
        .attr("height", function(d) {
            return yScale(d);
        })
        .attr("fill", function(d) {
            return "rgb("+ Math.round(d * 5) + ",0," + Math.round(d * 12) + ")"; //Change the color of the bar depending on the value
        });

    svg.append("g")
        .attr("transform", "translate(0, " + (h - 20) +")")
        .call(xAxis);

    svg.append("g")
        .attr("transform", `translate(${padding}, 0)`)
        .call(yAxis);

    var changeData = function() {
        numValues = dataset.length;
            while (dataset.length > 0) { //Clear the current dataset
                dataset.pop();
            }
            for (var i = 0; i < numValues; i++) {
                var newNumber = Math.floor(Math.random() * maxValue) + 1;  //New random integer (1-25)
                dataset.push(newNumber);			 //Add new number to array
            }
    }
    d3.select("#bt1")
        .on("click", function() {
            alert("Transition easeLinear")
            bt.addEventListener("click", function() {
                changeData();

                svg.selectAll("rect")  //Update all rects
                .data(dataset)
                .transition() //The default time between the start state and end state is 250 ms.
                .delay(function(d, i) {
                    return i/dataset.lenth * 1000; //delay when a transition occurs
                })
                .duration(500) // 0.3 seconds //must be after transiton //how long it take the transition
                .ease(d3.easeLinear)
                .attr("y", function(d) {
                    return h - yScale(d) - 20;
                })
                .attr("height", function(d) {
                    return yScale(d);
                })
                .attr("fill", function(d) {
                    return "rgb("+ Math.round(d * 5) + ",0," + Math.round(d * 12) + ")";
                });
            })
        })

    d3.select("#bt2")
        .on("click", function() {
            alert("Trasition easeCircleOut")
            bt.addEventListener("click", function() {
                    svg.selectAll("rect")  //Update all rects
                        .data(dataset)
                        .transition() //The default time between the start state and end state is 250 ms.
                        .delay(function(d, i) {
                            return i/dataset.lenth * 1000;
                        })
                        .duration(1000) // 0.3 seconds //must be after transiton
                        .ease(d3.easeCircleOut)
                        .attr("y", function(d) {
                            return h - yScale(d) - 20;
                        })
                        .attr("height", function(d) {
                            return yScale(d);
                        })
                        .attr("fill", function(d) {
                            return "rgb("+ Math.round(d * 5) + ",0," + Math.round(d * 12) + ")";
                        });
                })
        })


}
window.onload = init;
