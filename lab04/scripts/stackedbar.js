
function init(){
	var w = 300;
	var h = 300;
	var dataset = [
				{ apples: 5, oranges: 10, grapes: 22 },
				{ apples: 4, oranges: 12, grapes: 28 },
				{ apples: 2, oranges: 19, grapes: 32 },
				{ apples: 7, oranges: 23, grapes: 35 },
				{ apples: 23, oranges: 17, grapes: 43 }
			];

	//organise data by categories
	var stack = d3.stack()
					.keys(["apples", "oranges", "grapes"])
					.order(d3.stackOrderDescending);
	var series = stack(dataset);

	//console.log(series);

	//set up scales
	var xScale = d3.scaleBand()    
					.domain(d3.range(dataset.length))   //calculate the range of domain
					.rangeRound([0,w])
					.paddingInner(0.05);   //padding value of 5% of the bandwidth

	var yScale = d3.scaleLinear()  //y is quantitative
					.domain([0, d3.max(dataset, function(d) {
						return d.apples + d.oranges + d.grapes;
					})
					])
					.range([h, 0]);

	var colors = d3.scaleOrdinal(d3.schemeCategory10);

	//set up the SVG
	var svg = d3.select("#chart")
				.append("svg")
				.attr("width", w)
				.attr("height", h);
	
	var groups = svg.selectAll("g")
					.data(series)
					.enter()
					.append("g")
					.style("fill", function(d, i){
						return colors(i)
					});


	var rects = groups.selectAll("rect")
						.data(function(d) {return d;})
						.enter()
						.append("rect")
						.attr("x", function(d, i){
							return xScale(i);
						})
						.attr("y", function(d){
							return yScale(d[1]);
						})
						.attr("height", function(d){
							return yScale(d[0]) - yScale(d[1]);
						})
						.attr("width", xScale.bandwidth());
}

window.onload = init;