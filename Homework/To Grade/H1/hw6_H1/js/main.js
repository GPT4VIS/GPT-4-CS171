// Create SVG drawing space
let margin = {top: 40, right: 40, bottom: 60, left: 60};
let width = document.getElementById("chart-area").offsetWidth - margin.left - margin.right - 30;
let height = 600 - margin.top - margin.bottom;
let svg = d3.select("#chart-area")
	.append("svg")
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

// Scales
let x = d3.scaleTime()
	.range([0, width]);
let y = d3.scaleLinear()
	.range([height, 0]);

// Axes
let xAxis = d3.axisBottom()
	.scale(x);
let xAxisGroup = svg.append("g")
	.attr("class", "axis x-axis")
	.attr("transform", "translate(0, " + height + ")");
let yAxis = d3.axisLeft()
	.scale(y);
let yAxisGroup = svg.append("g")
	.attr("class", "axis y-axis");

// Create empty path for line chart
let lineChart = svg.append("path")
	.attr("class", "line");

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
		fullData = csv;
		data = fullData;

		// Create slider
		createSlider();

		// Draw the visualization for the first time
		updateVisualization("GOALS", data, true);
	});
}

function createSlider() {
	// Create slider labels
	let lowerVal = document.getElementById("lower-slider-value");
	let upperVal = document.getElementById("upper-slider-value");
	let minVal = parseInt(formatDate(d3.min(data, d => d.YEAR)));
	let maxVal = parseInt(formatDate(d3.max(data, d => d.YEAR)));
	lowerVal.innerText = minVal;
	upperVal.innerText = maxVal;

	// Create slider
	let slider = document.getElementById("time-period-slider");
	noUiSlider.create(slider, {
		start: [minVal, maxVal],
		step: 1,
		behaviour: "drag-smooth-steps-tap",
		connect: true,
		range: {"min": minVal, "max": maxVal}
	});

	// Attach event listener to slider
	slider.noUiSlider.on("slide", (values, handle) => {
		// Update slider labels
		lowerVal.innerText = parseInt(values[0]);
		upperVal.innerText = parseInt(values[1]);
	})
	slider.noUiSlider.on("change", (values, handle) => {
		// Update slider labels
		let newLower = parseDate(parseInt(values[0]));
		let newUpper = parseDate(parseInt(values[1]));

		// Filter data
		data = fullData.filter(d => {
			return (d.YEAR >= newLower && d.YEAR <= newUpper);
		});

		// Update chart
		changeYAxis();
	});

}

// Render visualization
function updateVisualization(yAxisData, dataset, initial) {
	// Define transition
	// No transition time when initially loading
	let t = d3.transition()
		.duration(() => {
			if (initial) {
				return 0;
			} else {
				return 800;
			}
		});

	// Update scales
	x.domain([
		d3.min(dataset, d => d.YEAR),
		d3.max(dataset, d => d.YEAR)
	]);
	y.domain([0, d3.max(dataset, d => d[yAxisData])]);

	// Update axes
	xAxisGroup.transition(t)
		.call(xAxis);
	yAxisGroup.transition(t)
		.call(yAxis);

	// Create line and update path
	let line = d3.line()
		.x(d => x(d.YEAR))
		.y(d => y(d[yAxisData]))
		.curve(d3.curveLinear);
	lineChart.datum(dataset)
		.attr("class", "line")
		.transition(t)
		.attr("d", line);

	// Update points
	points = svg.selectAll(".dot")
		.data(dataset);
	points.enter()
		.append("circle")
		.attr("class", "dot")
		.on("click", (e, d) => showEdition(d))
		.transition(t)
		.attr("cx", d => x(d.YEAR))
		.attr("cy", d => y(d[yAxisData]));
	points.on("click", (e, d) => showEdition(d))
		.transition(t)
		.attr("cx", d => x(d.YEAR))
		.attr("cy", d => y(d[yAxisData]));
	points.exit()
		.transition(t)
		.remove();
}

// Update y-axis based on user selection
function changeYAxis() {
	// Get selection
	let selection = d3.select("#yaxis-type")
		.property("value");
	updateVisualization(selection, data, false);
}

// Show details for a specific FIFA World Cup
function showEdition(d) {
	// Get div for edition display
	let editionDisplay = document.getElementById("world-cup-edition");
	editionDisplay.innerHTML = "";

	// Create h4 for edition title
	let editionName = document.createElement("h4");
	editionName.innerText = d.EDITION;
	editionDisplay.appendChild(editionName);

	// Create table element
	let table = document.createElement("table");
	let tableBody = document.createElement("tbody");
	table.className = "table";

	// Get relevant info to fill table
	let info = {
		"Winner": d.WINNER,
		"Goals": d.GOALS,
		"Average Goals": d.AVERAGE_GOALS,
		"Matches": d.MATCHES,
		"Teams": d.TEAMS,
		"Average Attendance": d.AVERAGE_ATTENDANCE
	};
	for (let key in info) {
		// Create and fill row
		let row = document.createElement("tr");
		let rowHead = document.createElement("th");
		rowHead.scope = "row";
		rowHead.innerText = key;
		let rowData = document.createElement("td");
		rowData.innerText = info[key].toLocaleString();

		row.appendChild(rowHead);
		row.appendChild(rowData);
		tableBody.appendChild(row);
	}
	table.appendChild(tableBody);
	editionDisplay.appendChild(table);

	// Remove display: none
	editionDisplay.style.display = "inline";
}