// Set up a new D3 project with D3.v7 and create a two-column layout in your HTML file
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const height = 400 - margin.top - margin.bottom;
const width = 600 - margin.left - margin.right;

// Load the CSV file and prepare the data for the area chart
d3.csv("data/zaatari-refugee-camp-population.csv", function (d) {
  let dateParser = d3.timeParse("%Y-%m-%d");
  d.date = dateParser(d.date);
  d.population = +d.population;
  return d;
}).then(function (data) {

  // Create linear scales for the x- and y-axes
  const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.population)])
    .range([height, 0]);

  // Create the area chart
  const area = d3.area()
    .x(d => x(d.date))
    .y0(height)
    .y1(d => y(d.population));

  const svg = d3.select(".area-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area);

  // Append the x- and y-axes and add a chart title
  const xAxis = d3.axisBottom(x).ticks(d3.timeMonth.every(2)).tickFormat(d3.timeFormat("%B %Y"));
  const yAxis = d3.axisLeft(y).tickFormat(d => d);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", -35)
    .attr("dy", ".35em")
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "end");

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Za'atari Refugee Camp Population");
});