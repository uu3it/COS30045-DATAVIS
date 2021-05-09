/*
File name: demo1.js
Author: Thuy Tien Le - 102848464
Description: demonstration of the use of JavaScript for lab 01
*/

"use strict";

function Button2011Clicked(){
	var fig2011 = document.getElementById("naplan2011");
	var fig2017 = document.getElementById("naplan2017");
	
	fig2011.style.display = "block";
	fig2017.style.display = "none";
}

function Button2017Clicked(){
	var fig2017 = document.getElementById("naplan2017");
	var fig2011 = document.getElementById("naplan2011");

	fig2017.style.display = "block";
	fig2011.style.display = "none";
}

function init(){
	var button2011 = document.getElementById("b2011");
	var button2017 = document.getElementById("b2017");

	var fig2011 = document.getElementById("naplan2011");
	var fig2017 = document.getElementById("naplan2017");
	
	fig2011.style.display = "none";
	fig2017.style.display = "none";

	button2011.onclick = Button2011Clicked;
	button2017.onclick = Button2017Clicked;
}

window.onload = init;