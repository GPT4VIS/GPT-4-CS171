const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const height = 400 - margin.top - margin.bottom;
const width = 600 - margin.left - margin.right;

d3.csv("data/zaatari-refugee-camp-population.csv", function (d) {
  let dateParser = d3.timeParse("%Y-%m-%d");
  d.date = dateParser(d.date);
  d.population = +d.population;
  return d;
}).then(function (data) {

  const x = d3.scaleTime().domain(d3.extent(data, d => d.date)).range([0, width]);

  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.population)]).range([height, 0]);

  const area = d3.area().x(d => x(d.date)).y0(height).y1(d => y(d.population));

  const svg = d3.select(".area-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area);

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

  // Tooltip

  // Create a group for tooltip elements
  const tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");

  // Vertical tooltip line
  tooltip.append("line")
    .attr("class", "tooltip-line")
    .attr("y1", 0)
    .attr("y2", height);

  // Text element for population value
  tooltip.append("text")
    .attr("class", "tooltip-text")
    .attr("x", 10)
    .attr("y", 20);

  // Text element for date value
  tooltip.append("text")
    .attr("class", "tooltip-text")
    .attr("x", 10)
    .attr("y", 35);

  // Rectangle for capturing mouse events
  svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mouseover", () => tooltip.style("display", null))
    .on("mouseout", () => tooltip.style("display", "none"))
    .on("mousemove", mousemove);

  function mousemove(event) {
    const bisectDate = d3.bisector(d => d.date).right;
    const xm = x.invert(d3.pointer(event, this)[0]);
    const i = bisectDate(data, xm, 1);
    const d0 = data[i - 1];
    const d1 = data[i];
    const d = xm - d0.date > d1.date - xm ? d1 : d0;

    tooltip.attr("transform", `translate(${x(d.date)},${y(d.population)})`);

    // Update tooltip line
    tooltip.select(".tooltip-line")
      .attr("x1", 0)
      .attr("x2", 0);

    // Update population text
    const populationFormatter = d3.format(",");
    tooltip.select(".tooltip-text")
      .text(`Population: ${populationFormatter(d.population)}`);

    // Update date text
    const dateFormatter = d3.timeFormat("%B %Y");
    tooltip.select(".tooltip-text + .tooltip-text")
      .text(`Date: ${dateFormatter(d.date)}`);
  }

});

// Your new data structure storing information about the three shelter types
const shelterData = [
  { type: "Caravans", percentage: 79.68 },
  { type: "Tents & Caravans", percentage: 10.81 },
  { type: "Tents", percentage: 9.51 }
];

// Code for the bar chart
const barChartSvg = d3.select(".bar-chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const y2 = d3.scaleLinear()
  .domain([0, d3.max(shelterData, d => d.percentage)])
  .range([height, 0]);

const x2 = d3.scaleBand()
  .domain(shelterData.map(d => d.type))
  .range([0, width])
  .padding(0.3);

barChartSvg.selectAll(".bar")
  .data(shelterData)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", d => x2(d.type))
  .attr("y", d => y2(d.percentage))
  .attr("height", d => height - y2(d.percentage))
  .attr("width", x2.bandwidth())
  .attr("fill", "steelblue");

const xAxis2 = d3.axisBottom(x2);
const yAxis2 = d3.axisLeft(y2).tickFormat(d => d + "%");

barChartSvg.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0,${height})`)
  .call(xAxis2);

barChartSvg.append("g")
  .attr("class", "y axis")
  .call(yAxis2);

barChartSvg.append("text")
  .attr("x", (width / 2))
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .text("Za'atari Refugee Camp Shelter Types");