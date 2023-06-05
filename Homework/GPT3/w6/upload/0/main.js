// margin conventions & svg drawing area - since we only have one chart, it's ok to have these stored as global variables
// ultimately, we will create dashboards with multiple graphs where having the margin conventions live in the global
// variable space is no longer a feasible strategy.

let margin = {top: 40, right: 40, bottom: 60, left: 60};

let width = 600 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

let svg = d3.select("#chart-area").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Date parser
let formatDate = d3.timeFormat("%Y");
let parseDate = d3.timeParse("%Y");


// Initialize data
loadData();

// FIFA world cup
let data;

// Create scales and axis functions
let xScale = d3.scaleTime().range([0, width]);
let yScale = d3.scaleLinear().range([height, 0]);

let xAxis = d3.axisBottom().scale(xScale);
let yAxis = d3.axisLeft().scale(yScale);

svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")");

svg.append("g")
	.attr("class", "y axis");

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

		// Update the xScale domain
		xScale.domain(d3.extent(data, d => d.YEAR));

		// Draw the visualization for the first time
		updateVisualization();
	});
}


// Render visualization
function updateVisualization() {

	// Update yScale domain
	yScale.domain([0, d3.max(data, d => d.GOALS)]);

	// Draw the line
	let line = svg.append("path")
		.datum(data)
		.attr("class", "line")
		.attr("d", d3.line()
			.x(d => xScale(d.YEAR))
			.y(d => yScale(d.GOALS))
		);

	// Draw the x-axis
	svg.select(".x.axis")
		.transition().duration(1000)
		.call(xAxis);

	// Draw the y-axis
	svg.select(".y.axis")
		.transition().duration(1000)
		.call(yAxis);

}


// Show details for a specific FIFA World Cup
function showEdition(d){

}