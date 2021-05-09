
function init(){

	// setting up width and height of svg
	var w = 800;   
	var h = 300;
	var barPadding = 30;
	var maxValue = 25;
	
	var dataset = [14, 5, 26, 23, 9, 12, 24, 6, 8, 10, 3, 26];

	var xScale = d3.scaleBand()    //method for ordinal scale
					.domain(d3.range(dataset.length))   //calculate the range of domain
					.rangeRound([0,w])   //round range to whole number
					.paddingInner(0.05);   //padding value of 5% of the bandwidth

	var yScale = d3.scaleLinear()  //y is quantitative
					.domain([0, d3.max(dataset)
					])
					.rangeRound([0, h]);
	
	var svg = d3.select("#chart")
				.append("svg")
				.attr("width", w)
				.attr("height", h);

	svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("x", function(d, i){
			return xScale(i);
		})
			
		.attr("y", function(d){
			return h - yScale(d);
		})
		.attr("width", xScale.bandwidth())  //calculate the width of bars
		.attr("height", function(d){
			return yScale(d);
		})
		.attr("fill", "#9966ff");

	//adding in label
	svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.text(function(d){
			return d;
		})
		.attr("x", function(d, i){
			return xScale(i) + xScale.bandwidth()/2;
		})
		.attr("y", function(d){
			return h - yScale(d) + 14;
		})
		.attr("text-anchor", "middle")
		.attr("fill", "white");

	//update - transition: easeCubicIn-Out
	d3.select("#add")
		.on("click", function(){
			//add extra value
			var newNumber = Math.floor(Math.random()*maxValue);
			dataset.push(newNumber);

			xScale.domain(d3.range(dataset.length)); //update xScale

			//add in new bars
			var bars = svg.selectAll("rect")
				.data(dataset);

			//create bars
			bars.enter()  //create element
				.append("rect")  //create rectangle
				//slide bars from the right
				.attr("x", w)
				.attr("y", function(d){
					return h - yScale(d);
				})
				.merge(bars)  //intergate new rectang
				.transition()
				.duration(500)
				//update x and bar width values
				.attr("x", function(d,i){  
					return xScale(i)
				})
				.attr("y", function(d){
					return h - yScale(d);
				})
				.attr("width", xScale.bandwidth())
				.attr("height", function(d){
					return yScale(d);
				})
				.attr("fill", "#9966ff");


			//add in label
			var labels = svg.selectAll("text")
				.data(dataset);

			labels.enter()
					.append("text")
					.merge(labels)
					.text(function(d){
						return d;
					})
					.attr("x", function(d, i){
						return xScale(i) + xScale.bandwidth()/2;
					})
					.attr("y", function(d){
						return h - yScale(d) + 14;
					})
					.attr("text-anchor", "middle")
					.attr("fill", "white");

			//update label 
			svg.selectAll("text")
				.data(dataset)
				.text(function(d){
					return d;
				})
				.attr("x", function(d, i){
					return xScale(i) + xScale.bandwidth()/2;
				})
				.attr("y", function(d){
					return h - yScale(d) + 14;
				})
				.attr("text-anchor", "middle")
				.attr("fill", "white");
			
		});

	d3.selectAll("#remove")
		.on("click", function(){
			//remove the last element of the array
			dataset.pop();
			xScale.domain(d3.range(dataset.length)); //update xScale
			
			//add in new bars element
			var bars = svg.selectAll("rect")
				.data(dataset);
			//remove bar
			bars.exit()
				.transition()
				.duration(500)
				.attr("x", w)
				.remove()

			bars.transition()
				.duration(500)
				//update x and bar width values
				.attr("x", function(d,i){  
					return xScale(i)
				})
				.attr("y", function(d){
					return h - yScale(d);
				})
				.attr("width", xScale.bandwidth())
				.attr("height", function(d){
					return yScale(d);
				});

			//update label 
			svg.selectAll("text")
				.data(dataset)
				.exit()
				.remove()
				.text(function(d){
					return d;
				})
				.attr("x", function(d, i){
					return xScale(i) + xScale.bandwidth()/2;
				})
				.attr("y", function(d){
					return h - yScale(d) + 14;
				})
				.attr("text-anchor", "middle")
				.attr("fill", "white");

			//re write label
			var labels = svg.selectAll("text")
				.data(dataset);

			labels.enter()
					.append("text")
					.merge(labels)
					.text(function(d){
						return d;
					})
					.attr("x", function(d, i){
						return xScale(i) + xScale.bandwidth()/2;
					})
					.attr("y", function(d){
						return h - yScale(d) + 14;
					})
					.attr("text-anchor", "middle")
					.attr("fill", "white");
		});

}

window.onload = init;