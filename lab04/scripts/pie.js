
function init(){

	var w = 300;
	var h = 300;

	var dataset = [6, 8, 6, 45, 12, 23];

	//pie chart parameter
	var outerRadius = w/2;
	var innerRadius = 0;
	//draw the pie arc
	var arc = d3.arc()
				.outerRadius(outerRadius)
				.innerRadius(innerRadius);
	//generate angles to draw segments
	var pie = d3.pie();

	//set up the svg
	var svg = d3.select("#chart")
				.append("svg")
				.attr("winth", w)
				.attr("height", h);

	//set up arc
	var arcs = svg.selectAll("g.arc")
					. data(pie(dataset))
					.enter()
					.append("g")
					.attr("class", "arc")
					//move the centre of the chart to centre of the SVG
					.attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

	var color = d3.scaleOrdinal(d3.schemeCategory10);

	arcs.append("path")
		.attr("fill", function(d, i) {
			return color(i);
		})
		.attr("d", function(d, i){
			return arc(d, i);
		})

	//add label
	arcs.append("text")
		.text(function(d) {
			return d.value;
		})
		//put labels away from the centre
		.attr("transform", function(d){
			return "translate(" + arc.centroid(d) + ")";
		});
}

window.onload = init;