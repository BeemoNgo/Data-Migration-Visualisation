function init(){
    var w = 600;
    var h = 200;
    var barPadding = 1;
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
        .append("rect");


    var createMouseEffect = function(){ //function to create mouse effect
        svg.selectAll("rect")
            .data(dataset)
            .on("mouseover", function(event,d){
                addTooltip(this,d); //add the tooltip
            })
            .on("mouseout",function(){
                d3.select(this)
                    .transition()
                    .duration(300) //change the color soothly
                    .attr("fill","#f1a2ab")  //change back to the old colour
                d3.select("#tooltip").remove(); //remove the tooltip
            });
        }

    //Create a tooltip
    var addTooltip = function(data,d){
        d3.select(data)
            .transition()
            .duration(250) //make the color change smoothly
            .attr("fill","#83d2cf"); //fill new colour for the bar
        var xPosition = parseFloat(d3.select(data).attr("x")) ; //get the xcoord for the text
        var yPosition = parseFloat(d3.select(data).attr("y"));
        if(d>10){ //if data is more than 10 then displayed in the bar
            yPosition = yPosition + 15;
        }
        else{
            yPosition = yPosition - 3; //displayed on top of the bar
        }

        svg.append("text") //append the text tooltip
            .attr("id","tooltip")
            .attr("x",function(d,i) {
                return xPosition + (w / dataset.length - barPadding) / 2;
            })
            .attr("y",yPosition)
            .text(d)
            .style("text-anchor", "middle")
            .style("font-family", "sans-serif")
            .style("font-size", "15px");
    }

    var drawBar = function(){ //function to draw the bar chart
        svg.selectAll("rect")
            .data(dataset)
        .attr("x", function(d,i){
            return xScale(i);
        })
        .attr("y", function(d){
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d){
            return yScale(d);
        })
        .attr("fill","#f1a2ab");
        createMouseEffect(); //create mouse effect for each bar

    }

    drawBar();        //draw the bar chart
    var drawNew = function(){ //function to redraw the bar whenever the data is updated
        var bars = svg.selectAll("rect")
                    .data(dataset);
        bars.enter()
            .append("rect")
            .on("mouseover", function(event,d){ //create mouse effect for each bar
                addTooltip(this,d);
                })
            .on("mouseout",function(){

                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("fill","#f1a2ab")
                d3.select("#tooltip").remove();
            })
            .attr("x",w)
            .attr("y",function(d){
                return h - yScale(d);
            })
            .merge(bars)
            .transition()
            .duration(500)
            .attr("x", function(d,i){
                return xScale(i);
            })
            .attr("y", function(d){
                return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d){
                return yScale(d);
            })
            .attr("fill","#f1a2ab");
    }

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

                //New bar
                drawNew();


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
                drawNew();
            }
    })

    var sortOrder = false;
    var sortBars = function() {
        sortOrder = !sortOrder;
        svg.selectAll("rect")
            .sort(function(a, b) {
                if (sortOrder) {
                    return d3.ascending(a, b);
                } else {
                    return d3.descending(a, b);
                }
            })
            .transition()
            .delay( function(d, i){
                return i * 50;
            })
            .duration(1000)
            .attr("x", function(d, i) {
                return xScale(i); //Update the x value
            });
    }

    d3.select("#sort")
        .on("click", function(){
            sortBars();
        })
}
window.onload = init;
