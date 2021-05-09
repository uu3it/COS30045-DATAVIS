/*
File name: demo1css.css
Author: Thuy Tien Le - 102848464
Description: demonstration of the use of D3
*/
var dataset = [];
var w = 500;   
var h = 100;
var barPadding = 1;

function init(){

	

	d3.csv("data/Execise_1.7.csv").then(function(data){
		if (data == null) {
			d3.select("#chart").append("p")
				.text("Data failed to load!");
		}
		dataset = data;
		barChart(dataset);
		console.log(dataset);
	});
}

function barChart(){

	var svg = d3.select("#chart")
				.append("svg")
				.attr("width", w)
				.attr("height", h);

		svg.selectAll("rect")
			.data(dataset)
			.enter()
			.append("rect")
			.attr("x", function(d, i){
				return i * (w / dataset.length);
			})
		
			.attr("y", function(d){
				return h - d.Test;
			})
			.attr("width", (w/dataset.length - barPadding))
			.attr("height", function(d){
				return d.Test * 4;
			})
			.attr("fill", "blue");
	}
window.onload = init;