

function init(){


	var dataset = [	[5, 20],
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

	


		// setting up width and height of svg
	var w = 800;   
	var h = 300;
	var padding = 30;

	/*
	var scale = d3.scaleLinear()
					.domain([100, 500])  //data input range
					.range([10, 350])   //output, range available for visualisation on screen
	*/

	var xScale = d3.scaleLinear()
					.domain([d3.min(dataset, function(d){
						return d[0];   //return min of x value
						}),
							d3.max(dataset, function(d){
						return d[0];   //retund max of x value
						})
					])
					.range([padding, w - padding * 2]);

	var yScale = d3.scaleLinear()
					.domain([d3.min(dataset, function(d){
						return d[1];   //returns min of y value
						}),
							d3.max(dataset, function(d){
						return d[1];   //returns max of y value
						})
					])
					.range([h - padding, padding]);


	var svg = d3.select("#chart")  
				.append("svg")
				.attr("width", w)
				.attr("height", h);
		svg.selectAll("circle")   //draw plot
			.data(dataset)
			.enter()
			.append("circle")
			.attr("cx", function(d, i){
				return xScale(d[0]); //returns scaled value
			})
			
			.attr("cy", function(d){
				return yScale(d[1]);
			})
			.attr("r", 5)
			.attr("fill", function(d, i){
				if (i == 8)
				{
					return "red";
				}
					return"blue";
		});
		
		svg.selectAll("text")  //draw text
			.data(dataset)
			.enter()
			.append("text")
			.text(function (d){
				return "(" + d[0] + ", " + d[1] + ")";
			})
			.attr("x", function(d, i){
				return xScale(d[0]);
			})
			
			.attr("y", function(d){
				return yScale(d[1]);
			})
			.attr("fill", "purple")
			;

	var xAxis = d3.axisBottom()    //x axis using cakculated scale 
					.ticks(5)
					.scale(xScale);

	svg.append("g")
		.attr("transform", "translate(0, " + (h - padding) + ")")
		.call(xAxis);


	var yAxis = d3.axisLeft()     //y axis using calculated yscale
					.ticks(5)
					.scale(yScale);

	svg.append("g")
		.attr("transform", "translate(" + padding + ")")
		.call(yAxis);

}

window.onload = init;