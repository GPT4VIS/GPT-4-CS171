// margin conventions & svg drawing area - since we only have one chart, it's ok to have these stored as global variables
// ultimately, we will create dashboards with multiple graphs where having the margin conventions live in the global
// variable space is no longer a feasible strategy.

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

// Create the HTML select box
let selectBox = d3.select("#chart-area")
  .append("div").attr("class", "select-container")
  .append("select")
  .on("change", updateVisualization);

// Add options to the select box
let options = ["GOALS", "AVERAGE_GOALS", "MATCHES", "TEAMS", "AVERAGE_ATTENDANCE"];
selectBox.selectAll("option")
  .data(options)
  .enter()
  .append("option")
  .attr("value", d => d)
  .text(d => d)
  .property("selected", d => d === "GOALS"); // Set the default value

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

  // Get the selected attribute
  let selectedAttribute = selectBox.property("value");

  // Update yScale domain based on the selected attribute
  yScale.domain([0, d3.max(data, d => d[selectedAttribute])]);

  // Draw the line
  let line = svg.selectAll(".line").data([data]);

  line.enter()
    .append("path")
    .attr("class", "line")
    .merge(line)
    .transition()
    .duration(800)
    .attr("d", d3.line()
      .x(d => xScale(d.YEAR))
      .y(d => yScale(d[selectedAttribute]))
      .curve(d3.curveLinear));

  line.exit().remove();

  // Draw the circles
  let circles = svg.selectAll(".circle").data(data);


  circles.enter()
    .append("circle")
    .attr("class", "circle")
    .on("click", function (event, d) {
      // Call function to show details for selected world cup
      showEdition(d);
    })
    .merge(circles)
    .transition()
    .duration(800)
    .attr("cx", d => xScale(d.YEAR))
    .attr("cy", d => yScale(d[selectedAttribute]))
    .attr("r", 3)

  circles.exit().remove();

  // Draw the x-axis
  svg.select(".x.axis")
    .transition().duration(800)
    .call(xAxis);

  // Draw the y-axis
  yAxis.scale(yScale);
  svg.select(".y.axis")
    .transition().duration(800)
    .call(yAxis);
}

// Show details for a specific FIFA World Cup
function showEdition(d) {
  // Update the details div
  d3.select("#details-title").text(formatDate(d.YEAR) + " FIFA World Cup");
  d3.select("#details-winner").text(d.WINNER);
  d3.select("#details-goals").text(d.GOALS);
  d3.select("#details-avg-goals").text(d.AVERAGE_GOALS.toFixed(2));
  d3.select("#details-matches").text(d.MATCHES);
  d3.select("#details-teams").text(d.TEAMS);
  d3.select("#details-avg-attendance").text(d.AVERAGE_ATTENDANCE.toFixed(0));
}