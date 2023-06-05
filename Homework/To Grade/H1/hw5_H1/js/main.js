
// used to parse date string to date format
const dateConvert = d3.timeParse("%Y-%m-%d");
const dateFormat = d3.timeFormat("%Y-%m-%d");
const popFormat = d3.format(',');

// Margin object with properties for the four directions
let margin = {top: 70, right: 90, bottom: 60, left: 100};

// Width and height as the inner dimensions of the chart area
let width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Load CSV file
d3.csv("data/zaatari-refugee-camp-population.csv", d => {
	// convert values
	d.date = dateConvert(d.date);
	d.population = +d.population;
	return d;
}).then( data => {

	drawGraph(data)
	console.log(data)
});


function drawGraph(data) {
    let svg = d3.select("#chart-area").append("svg")
	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	let endDate = d3.max(data, function(d) {
		return d.date;
	});

	let startDate = d3.min(data, function(d) {
		return d.date;
	});

	let maxPopulation = d3.max(data, function(d) {
		return d.population;
	});
	
	let xDateScale = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, width]);

	let yPopulationScale = d3.scaleLinear()
	.domain([0, maxPopulation])
	.range([height, 0])

    // append x axis
    let xAxis = d3.axisBottom()
	.scale(xDateScale)
	.tickFormat(d3.timeFormat("%b %Y")); // Date ie, Apr 2013 format

	svg.append("g")
	.attr("class", "axis x-axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

    // append y axis 
	let yAxis = d3.axisLeft()
    .scale(yPopulationScale);

	svg.append("g")
	.attr("class", "axis y-axis")
	.attr("transform", "translate(,0)")
	.call(yAxis);

	// y axis label
	svg.append("text")
	.attr("class", "axis-label")
	.attr("text-anchor", "middle")
	.attr("y", -70)
	.attr("x", -height/2)
	.attr("dy", ".75em")
	.attr("transform", "rotate(-90)")
	.text("Population (Number of People)");

	// x axis label
	svg.append("text")
	.attr("class", "axis-label")
	.attr("text-anchor", "middle")
	.attr("x", width / 2)
	.attr("y", height + 40)
	.text("Date");

    // add area
    let path = svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("fill", "#806140")
    .attr("d", d3.area()
    .x(function(d) { return xDateScale(d.date) })
    .y0(yPopulationScale(0))
    .y1(function(d) { return yPopulationScale(d.population) })
    );
    
	// Title
	svg.append("text")
	.attr("class","graph-title")
	.attr("x",width/2)
	.attr("y", -20)
	.attr("text-anchor", "middle")
	.text("Camp Population");
	
	let toolgroup = svg.append("g")
	.attr("class","tooltip2")
	.style("display","none");

	// vertical line
	toolgroup.append("line")
	.attr("x",0)
	.attr("stroke","#cfaf8c")
	.attr("y1",0)
	.attr("y2",height)
	.attr("x1", 20)
	.attr("x2",20)
	.style("stroke-width", 1)

	// tool tip text
	let popTooltip = toolgroup.append("text")
	.attr("class","pop-tooltip")
	.attr("x",25)
	.attr("y",20)
	.text("")

	let dateTooltip = toolgroup.append("text")
	.attr("class","date-tooltip")
	.attr("x",25)
	.attr("y",35)
	.text("")
	.style("fill", "gray")

	// define space where mouse is detected
	let rectangle = svg.append("rect")
	.attr("width",width)
	.attr("height",height)
	.attr("x",0)
	.attr("fill","none")
	.attr("pointer-events","all")
	.on("mouseover", function(d) {
		toolgroup.style("display",null)
	})
	.on("mouseout", function(d) {
		toolgroup.style("display","none")
	})
	.on("mousemove",followmouse)
	
	// function for tooltip showing data
	function followmouse(eVent) {

		let xPos = d3.pointer(eVent)[0]

		let invertedDate = xDateScale.invert(xPos)
		console.log(invertedDate)

		let bisectDate = d3.bisector(d=>d.date).left
		let index = bisectDate(data, invertedDate)

		let dateValue = xDateScale.invert
		
		let closest = data[index]
		toolgroup
		.attr("transform", "translate(" + (xDateScale(closest.date) -20) + ",0)")
		.style("display",null);

		popTooltip.text(popFormat(closest.population))
		dateTooltip.text(dateFormat(closest.date))
	}

};

// Create a compound JS data structure to store information about the shelter types

// The vast majority of households (79.68%) were recorded as living in caravans. 
// That number was followed by 10.81% of households recorded as living in a combination 
// of tents and caravans, while 9.51% were observed to be living in tents only.

// easy to read data structure 
let barData = [
	{type: "Caravans", percentage: 79.68},
	{type: "Combination", percentage: 10.81},
	{type: "Tents", percentage: 9.51}
]


console.log(barData)

// create bar chart
function drawBar(data2) {
	let width2 = 400
	let height2 = 400
	let margin2 = {top: 70, right: 50, bottom: 50, left: 55};

	let svg = d3.select("#bar-area").append("svg")
	.attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
	

	// band scale for bars
	let xTypescale = d3.scaleBand()
	.domain(data2.map(function(d) { return d.type }))
    .range([0, width2])
	.padding(0.2);;

	let yPercentScale = d3.scaleLinear()
	.domain([0, 100])
	.range([height2,0])

	// append x axis
	let xAxis = d3.axisBottom()
	.scale(xTypescale)

	svg.append("g")
	.attr("transform", "translate(0," + (height2) + ")")
	.call(xAxis);

	// append y axis 
	let yAxis = d3.axisLeft()
	.scale(yPercentScale)
	.tickFormat(function(d) { return d + "%"; });

	svg.append("g")
	.call(yAxis);

	// y axis label
	svg.append("text")
	.attr("class", "axis-label")
	.attr("text-anchor", "middle")
	.attr("y", -55)
	.attr("x", -height/2)
	.attr("dy", ".75em")
	.attr("transform", "rotate(-90)")
	.text("Percentage of People");

	// x axis label
	svg.append("text")
	.attr("class", "axis-label")
	.attr("text-anchor", "middle")
	.attr("x", width / 2 - 40)
	.attr("y", height + 70)
	.text("Type of Shelter")

    //  bars
	let bars = svg.selectAll("mybar")
	.data(data2)
	.enter()
	.append("rect")
	.attr("x", function(d) { return xTypescale(d.type); })
	.attr("y", function(d) { return yPercentScale(d.percentage); })
	.attr("width", xTypescale.bandwidth())
	.attr("height", function(d) { return height2 - yPercentScale(d.percentage); }) // from top of svg
	.attr("fill", "#806140");
	
	// percentages on top of bars
	let texts = svg.selectAll("mytext")
    .data(data2)
    .enter()
	.append("text")
    .attr("x", function(d) { return xTypescale(d.type) + xTypescale.bandwidth() / 2;})
	.attr("y", function(d) { return yPercentScale(d.percentage) - 10; })
	.text(function(d) { return d.percentage + "%"})
	.attr("text-anchor","middle")
	.attr("class","barLabel");

	// Title
	svg.append("text")
	.attr("class","graph-title")
	.attr("x",width2/2)
	.attr("y", -20)
	.attr("text-anchor", "middle")
	.text("Type of Shelter");
}

// call draw bar chart
drawBar(barData);