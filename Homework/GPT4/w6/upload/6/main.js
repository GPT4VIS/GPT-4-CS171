// margin conventions & svg drawing area
let margin = { top: 40, right: 40, bottom: 60, left: 60 };
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

// Scales
let x = d3.scaleTime().range([0, width]);
let y = d3.scaleLinear().range([height, 0]);

// Axis
let xAxis = d3.axisBottom().scale(x);
let yAxis = d3.axisLeft().scale(y);

// Line generator
let line = d3.line()
  .x(d => x(d.YEAR))
  .y(d => y(d[getYAttribute()]))
  .curve(d3.curveMonotoneX);

// SVG elements
svg.append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(0, " + height + ")");

svg.append("g")
  .attr("class", "y-axis");

// Path element
let path = svg.append("path");

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

    // Set initial domains for scales
    x.domain(d3.extent(data, d => d.YEAR));
    y.domain([0, d3.max(data, d => d.GOALS)]);

    // Draw the visualization for the first time
    updateVisualization();
  });
}

// Render visualization
function updateVisualization() {
  // Update this line of code inside updateVisualization function
  y.domain([0, d3.max(data, d => d[getYAttribute()])]);

  // Call axis functions with the new domain
  svg.select(".x-axis")
    .transition()
    .duration(800)
    .call(xAxis);

  svg.select(".y-axis")
    .transition()
    .duration(800)
    .call(yAxis);

  // Generate the path string with new data
  path
    .datum(data)
    .transition()
    .duration(800)
    .attr("class", "line")
    .attr("d", line);

  // Emphasize the data points on the D3 line graph
  // Adding circles for each data point
  let circles = svg.selectAll("circle")
    .data(data);

  circles.enter().append("circle")
    .attr("cx", d => x(d.YEAR))
    .attr("cy", d => y(d[getYAttribute()]))
    .attr("r", 0)
    .attr('fill', 'steelblue')
    .on("click", d => showEdition(d))
    .transition()
    .duration(800)
    .attr("r", 4);

  circles
    .transition()
    .duration(800)
    .attr("cx", d => x(d.YEAR))
    .attr("cy", d => y(d[getYAttribute()]))
    .attr("r", 4)
    .attr('fill', 'steelblue');

  circles.exit()
    .transition()
    .duration(800)
    .attr("r", 0)
    .remove();
}

// Show details for a specific FIFA World Cup
function showEdition(d) {
  let detailsContainer = d3.select("#details-container");

  // Create/update HTML content with available information
  detailsContainer.html(`
    <h3>${formatDate(d.YEAR)}</h3>
    <p>Winner: ${d.WINNER}</p>
    <p>Goals: ${d.GOALS}</p>
    <p>Average Goals: ${d.AVERAGE_GOALS}</p>
    <p>Matches: ${d.MATCHES}</p>
    <p>Teams: ${d.TEAMS}</p>
    <p>Average Attendance: ${d.AVERAGE_ATTENDANCE}</p>
  `);
}

function getYAttribute() {
  return d3.select("#yAttribute").property("value");
}

// Add this at the end of the main.js file
d3.select("#yAttribute").on("change", updateVisualization);