
var w = 600;   
var h = 300;
var paddingx = 60;
var paddingy = 20;
var dataset;

function init(){

	

	d3.csv("data/Unemployment_78-95.csv", function(d){
		return {
			date: new Date(+d.year, +d.month-1),  //joining year and month
			number: +d.number
		};
	}).then(function(data){
		if (data == null) {
			d3.select("#chart").append("p")
				.text("Data failed to load!");
		}
		dataset = data;
		lineChart(dataset);
		console.table(dataset, ["date", "number"]);
	});
}

function lineChart(d){

	var xScale = d3.scaleTime()
					.domain([
						d3.min(dataset, function(d) {return d.date; }),
						d3.max(dataset, function(d) { return d.date;})
					])
					.range([paddingx, w]);

	var yScale = d3.scaleLinear()
					.domain([0, d3.max(dataset, function(d) {return d.number;}) ])
					.range([h - paddingy, 0]);

	//for line chart
	/*var line = d3.line()
				.x(function(d) {return xScale(d.date); })    //get date data for x axis
				.y(function(d) {return yScale(d.number); });  //get number data for y axis
	*/
	//for area chart
	var area = d3.area()
				.x(function(d) {return xScale(d.date); })    //get date data for x axis
				//base line
				.y0(function(d) {return yScale.range()[0]; })
				.y1(function(d){return yScale(d.number); })

	var svg = d3.select("#chart")
				.append("svg")
				.attr("width", w)
				.attr("height", h);

		svg.append("path")
			.datum(dataset)  //bind data to a single path element
			//.attr("class", "line")  //append line
			//.attr("d", line)
			.attr("class", "area")	//append area
			.attr("d", area); 

	var xAxis = d3.axisBottom()    //x axis using cakculated scale 
					.ticks(10)
					.scale(xScale);

	svg.append("g")
		.attr("transform", "translate(0, " + (h - paddingy) + ")")
		.call(xAxis);


	var yAxis = d3.axisLeft()     //y axis using calculated yscale
					.ticks(10)
					.scale(yScale);

	svg.append("g")
		.attr("transform", "translate(" + paddingx + ", 0)")
		.call(yAxis);

	//half a million line
	svg.append("line")
		.attr("class", "line_halfMilMark")
	//start of line
		.attr("x1", paddingx)
		.attr("y1", yScale(500000))
	//end of line
		.attr("x2", w)
		.attr("y2", yScale(500000));

	svg.append("text")
		.attr("class", "halfMilMark")
		.attr("x", paddingx + 10)
		.attr("y", yScale(500000) - 7)
		.text("Half a million unemployed");

	}


window.onload = init;