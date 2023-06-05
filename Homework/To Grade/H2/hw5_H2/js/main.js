var populations;
const formatTime = d3.timeFormat("%Y, %m, %d")

shelterTypes = [
	{"typeName" : "Caravans", "percentage" : 0.7968},
	{"typeName" : "Combination*", "percentage" : 0.1081},
	{"typeName" : "Tents", "percentage" : 0.0951}
]

// load data then execute rendering
d3.csv("data/zaatari-refugee-camp-population.csv", (row) => {

	row.date = new Date(formatTime(Date.parse(row.date) + 86400000))
	row.population = +row.population
	return row

}).then( (data) => {

	populations = data
	console.log(populations)

	drawAreaGraph(populations);
	drawBarGraph(shelterTypes);
	
})

function drawBarGraph(shelterTypes) {

	let margin = {top: 40, right: 40, bottom: 40, left: 40};

	let width = 470 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	let svg = d3.select("#bar-area").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// add graph title above chart
	svg.append("text")
		.attr("x", 140)
		.attr("y", -20)
		.attr("class", "graph-title")
		.text("Type of Shelter");

	let xType = d3.scaleBand()
		.domain(["Caravans", "Combination*", "Tents"])
		.range([0, width])
		.round(true)
		.paddingInner(0.1)
		.paddingOuter(0.1);

	let yPercentage = d3.scaleLinear()
		.domain([0, 1])
		.range([height, 0]);

	// draw bars for each shelter type's percentage
	svg.selectAll(".bar")
		.data(shelterTypes)
		.enter()
		.append("rect")
		.attr("fill", "#963A2F")
		.attr("width", xType.bandwidth())
		.attr("height", d => height - yPercentage(d.percentage))
		.attr("y", d => yPercentage(d.percentage))
		.attr("x", d => xType(d.typeName));
	
	//append axes and bar labels
	let xAxis = d3.axisBottom()
		.scale(xType);
	
	let yAxis = d3.axisLeft()
		.scale(yPercentage)
		.tickFormat(d3.format(".0%"));
	
	svg.append("g")
		.attr("class", "axis x-axis")
		.attr("transform", "translate(0, " + (height) + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "axis y-axis")
		.attr("transform", "translate(0, 0)")
		.call(yAxis);

	// add group for labels above each bar
	let barLabels = svg.append("g");
	
	barLabels.selectAll("text")
		.data(shelterTypes)
		.enter()
		.append("text")
		.attr("class", "bar-label")
		.attr("x", (d) => xType(d.typeName) + ((0.70) * xType.bandwidth()) / 2)
		.attr("y", (d) => yPercentage(d.percentage) - 10)
		.text((d) => d3.format(".2%")(d.percentage));

	svg.append("text")
		.attr("x", 0)
		.attr("y", height + margin.bottom)
		.style("font-size", "11px")
		.text("* Households with recorded tent and caravan combinations")

}

function drawAreaGraph(populations) {

	let margin = {top: 40, right: 40, bottom: 40, left: 40};

	let width = 800 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom;

	let svg = d3.select("#chart-area").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	// add graph title above chart
	svg.append("text")
		.attr("x", 320)
		.attr("y", -20)
		.attr("class", "graph-title")
		.text("Camp Population")

	var xTime = d3.scaleTime()
		.domain([new Date(2013, 0, 14), new Date(2015, 10, 17)])
		.range([margin.left, width]);

	var yPopulation = d3.scaleLinear()
		.domain([0, d3.max(populations, function(p) {return p.population; })])
		.range([height, 0]);
	
	// draw area section
	let area = d3.area(populations)
		.x(d => xTime(d.date))
		.y1(d => yPopulation(d.population))
		.y0(yPopulation(0));
	
	let path = svg.append("path")
		.datum(populations)
		.attr("class", "area")
		.attr("d", area);

	// handle axes
	let xAxis = d3.axisBottom()
		.scale(xTime)
		.ticks(d3.utcMonth.every(4))
		.tickFormat(d3.timeFormat('%b %Y'));
	
	let yAxis = d3.axisLeft()
		.scale(yPopulation)
	
	svg.append("g")
		.attr("class", "axis x-axis")
		.attr("transform", "translate(0, " + (height) + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "axis y-axis")
		.attr("transform", "translate(" + (margin.right) + ", 0)")
		.call(yAxis);

	// create tooltip group and line, population, date elements
	let toolTips = svg.append("g")
		.attr("class", "tool-tip")
		.attr("display", "none");

	toolTips.append("line")
		.attr("x1", margin.left)
		.attr("y1", 0)
		.attr("x2", margin.left)
		.attr("y2", height);
	
	toolTips.append("text")
		.attr("class", "tool-population")
		.attr("x", margin.left + 10)
		.attr("y", 10)
		.text("Population");
	
	toolTips.append("text")
		.attr("class", "tool-date")
		.attr("x", margin.left + 10)
		.attr("y", 30)
		.text("Date");

	//append transparent rectangle as zone for mouse event functions
	svg.append("rect")
		.attr("x", margin.left)
		.attr("y", 0)
		.attr("height", height)
		.attr("width", width - margin.left)
		.attr("opacity", 0)
		.on("mouseover", function() {
			d3.select(".tool-tip").attr("display", "null");
		})
		.on("mouseout", function() {
			d3.select(".tool-tip").attr("display", "none");
		})
		.on("mousemove", function(event, d) {
			let bisectDate = d3.bisector(d=>d.date).left;
			let mousePos = d3.pointer(event)[0];
			let index = bisectDate(populations, xTime.invert(mousePos));
			let element = populations[index];
			d3.select(".tool-tip").attr("transform", "translate(" + (mousePos - margin.left) + ", 0)");
			d3.select(".tool-population").text(d3.format(",")(element.population));
			d3.select(".tool-date").text(d3.timeFormat("%Y-%m-%d")(element.date));
		});

}