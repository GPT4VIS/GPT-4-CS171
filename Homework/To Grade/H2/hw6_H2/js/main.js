
// margin conventions & svg drawing area - since we only have one chart, it's ok to have these stored as global variables
// ultimately, we will create dashboards with multiple graphs where having the margin conventions live in the global
// variable space is no longer a feasible strategy.

let margin = {top: 40, right: 40, bottom: 60, left: 60};

let width = 600 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

// Scales
//tried to use padding, didn't really like it
let padding = 10;
// Date parser
let formatDate = d3.timeFormat("%Y");
let parseDate  = d3.timeParse("%Y");

let svg = d3.select("#chart-area").append("svg")
	.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let xScale = d3.scaleTime()
	.range([padding, width - padding])
let yScale = d3.scaleLinear()
	.range([height - padding, padding])
//this makes the axis
let xAxis = d3.axisBottom()
		.scale(xScale)
		.tickFormat(d3.format("d"));

let yAxis = d3.axisLeft()
		.scale(yScale)

//draw the axis
let groupX = svg.append("g")
	.attr("class", "axis xAxis")
	.attr("transform", `translate(0, ${height})`)

let groupY = svg.append("g")
	.attr("class", "axis yAxis")



// Initialize data
loadData();
// FIFA world cup
let data;

// Load CSV file
function loadData() {
	d3.csv("data/fifa-world-cup.csv", row => {
		row.YEAR = parseDate(row.YEAR);
		row.TEAMS = +row.TEAMS;
		row.MATCHES = +row.MATCHES;
		row.GOALS = +row.GOALS;
		row.AVERAGE_GOALS = +row.AVERAGE_GOALS;
		row.AVERAGE_ATTENDANCE = +row.AVERAGE_ATTENDANCE;
		return row
	}).then(csv => {
		// Store csv data in global variable
		data = csv;

		//three visuals
		drawLine();
		slider();
		showEdition(data[0]);

		// Draw the visualization for the first time
		updateVisualization(mDataRange(data));
	});
}


// Render visualization
function updateVisualization(dateRange) {

	let transit = d3.transition()
		.duration(800);
	let selection = d3.select("#selected-data")
		.property("value");
	let filteredData = data.filter(d=> (+formatDate(d.YEAR) >= dateRange[0]) && (+formatDate(d.YEAR) <= dateRange[1]));
	// Create Circles
	d3.select("#dataRange")
		.text(`${dateRange[0]} - ${dateRange[1]}`);
	d3.select("#selected-data")
		.on("change", () => updateVisualization(mDataRange(filteredData)))
	// Scale Updates
	xScale.domain(mDataRange(filteredData));
	yScale.domain([d3.min(filteredData, d=> d[selection]), d3.max(filteredData, d=> d[selection])]);
	console.log(filteredData);
	svg.select(".line")
		.datum(filteredData)
		.transition(transit)
		.attr("d", d3.line(filteredData)
			.x(d => xScale(+formatDate(d.YEAR)))
			.y(d => yScale(d[selection]))
			.curve(d3.curveLinear)
		);
	// Create Circles
	let circles = svg.selectAll("circle")
		.data(filteredData);

	circles.enter()
		.append("circle")
		.on("click", (event, d) => showEdition(d))
		.attr("cy", d=> yScale(height))
		.merge(circles)
		.transition(transit)
		.attr("class", "tooltip-circle")
		.attr("cx", d => xScale(+formatDate(d.YEAR)))
		.attr("cy", d=> yScale(d[selection]))
		.attr("r", 7);

	circles.exit()
		.remove();
	groupX.transition(transit)
		.call(xAxis)
	groupY.transition(transit)
		.call(yAxis)
}

function drawLine() {
	let selection = d3.select("#selected-data").property("value");
	xScale.domain(mDataRange(data));
	yScale.domain([d3.min(data, (d) => d[selection]), d3.max(data,  (d)=> d[selection])]);

	let line = svg.append("path")
		.datum(data)
		.attr("class", "line")
		.attr("d", d3.line(data)
			.x(d => xScale(+formatDate(d.YEAR)))
			.y(d => yScale(d[selection]))
			.curve(d3.curveLinear)
		);
}

function slider (){
	let slider = document.getElementById("slider");
	noUiSlider.create(slider, {
		start: mDataRange(data),
		connect: true,
		behaviour: "tap-drag",
		step: 4,
		margin: 8,
		range: {
			"min": d3.min(data, d=> +formatDate(d.YEAR)),
			"max": d3.max(data, d=> +formatDate(d.YEAR))
		},
		tooltips: true,
		format: {
			to: function(value) {
				return d3.format("d")(value);
			},
			from: function(value){
				return +value;
			}
		},
		pips:{
			mode: "positions",
			values: [0, 25, 50, 75, 100],
			density: 4,
			stepped: true
		}
	});

	slider.noUiSlider.on("slide", function(values, handle){
		console.log(values)
		updateVisualization(values)
	});

}

// Return range of years for Slider
function mDataRange(currentData){
	return [d3.min(currentData, (d) => +formatDate(d.YEAR)), d3.max(currentData, (d) => +formatDate(d.YEAR))];
}



// Show details for a specific FIFA World Cup
function showEdition(d){
	document.getElementById("edition").innerHTML = d.EDITION;
	document.getElementById("winner").innerHTML = d.WINNER;
	document.getElementById("goals").innerHTML = d.GOALS;
	document.getElementById("avg-goals").innerHTML = d.AVERAGE_GOALS;
	document.getElementById("matches").innerHTML = d.MATCHES;
	document.getElementById("teams").innerHTML = d.TEAMS;
	document.getElementById("attendance").innerHTML = d.AVERAGE_ATTENDANCE.toLocaleString("en-US");
}


//Discussed with Janna Withrow on some of this assignment