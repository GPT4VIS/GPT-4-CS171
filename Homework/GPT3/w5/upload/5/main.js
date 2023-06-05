// Load the CSV file and convert the date string into a Date object
d3.csv("data/zaatari-refugee-camp-population.csv", function(d) {
  return {
      date: d3.timeParse("%Y-%m-%d")(d.date),
      population: +d.population
  };
}).then(function(data) {
  //Set up the margin, height, and width for the area chart
  let margin = {top: 20, right: 20, bottom: 50, left: 70};
  let height = 500 - margin.top - margin.bottom;
  let width = 600 - margin.left - margin.right;

  // Append a new SVG drawing space to the HTML document
  let svgArea = d3.select("#area-chart")
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Set up linear x and y scales
  let xScale = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.date; }))
    .range([0, width]);

  let yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.population; })])
    .range([height, 0]);

  // Define a function that generates the area
  let areaGenerator = d3.area()
    .x(function(d) { return xScale(d.date); })
    .y0(height)
    .y1(function(d) { return yScale(d.population); });

  // Draw the area
  let path = svgArea.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", areaGenerator);

  // Append x and y axes to the chart
  svgArea.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%B %Y")))
    .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end')
      .attr('dx', '-1em')
      .attr('dy', '-0.5em');

  svgArea.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(yScale))
    .selectAll('text')
      .attr('y', -10)
      .attr('x', -5)
      .attr('dy', '1.5em')
      .style('text-anchor', 'end');

  // Add title to the area chart
  d3.select("#area-chart-title")
    .style("text-anchor", "middle")
    .text("Population in Za'atari Refugee Camp");

  // Create the tooltip elements
  let tooltip = d3.select('body')
    .append('div')
    .attr('id', 'tooltip')
    .classed('tooltip', true);

  tooltip.append('div')
    .attr('class', 'population');

  tooltip.append('div')
    .attr('class', 'date');

  // Append an SVG line to the chart to guide the tooltip
  let tooltipLine = svgArea.append('line')
    .attr('id', 'tooltip-line');

  // Append a rectangle over the area chart to capture mouse events
  svgArea.append('rect')
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .on('mouseover', function() {
      tooltip.style('display', null);
      tooltipLine.style('display', null);
    })
    .on('mouseout', function() {
      tooltip.style('display', 'none');
      tooltipLine.style('display', 'none');
    })
    .on('mousemove', function(event) {
      let xPosition = d3.pointer(event)[0];
      let date = xScale.invert(xPosition);
      let bisectDate = d3.bisector(d => d.date).left;
      let index = bisectDate(data, date);
      let d0 = data[index - 1];
      let d1 = data[index];
      // Find the date data point that is closest to the current mouse position
      let d = date - d0.date > d1.date - date ? d1 : d0;
      // Update the position of the tooltip and line elements
      tooltipLine.attr('x1', xScale(d.date))
        .attr('y1', 0)
        .attr('x2', xScale(d.date))
        .attr('y2', height);
      tooltip.html(`<div class="population">${d.population.toLocaleString()} people</div><div class="date">${d.date.toDateString()}</div>`)
        .style('left', `${d3.pointer(event)[0] + 20}px`)
        .style('top', `${d3.pointer(event)[1] - 20}px`)
        .style("display", "inline-block");
    });

  // Create a compound JS data structure to store information about the shelter types
  let shelterTypes = [
    {type: "Caravans", percentage: 79.68},
    {type: "Combination of Tents and Caravans", percentage: 10.81},
    {type: "Tents only", percentage: 9.51}
  ];

  // Create a vertical bar chart for the camp's three shelter types
  let svgBar = d3.select("#bar-chart")
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  let yScaleBar = d3.scaleLinear()
    .domain([0, d3.max(shelterTypes, function(d) { return d.percentage; })])
    .range([height, 0])

  let xScaleBar = d3.scaleBand()
    .domain(shelterTypes.map(function(d) { return d.type; }))
    .range([0, width])
    .paddingInner(0.1)

  svgBar.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScaleBar))

    svgBar.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(yScaleBar).tickFormat(d => d + '%'))

  svgBar.selectAll('rect')
    .data(shelterTypes)
    .enter()
    .append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) { return xScaleBar(d.type); })
      .attr('y', function(d) { return yScaleBar(d.percentage); })
      .attr('width', xScaleBar.bandwidth())
      .attr('height', function(d) { return height - yScaleBar(d.percentage); })
      .on('mouseover', function(d) {
        d3.select(this).transition().duration('100').attr('opacity', '.85');
        tooltip.html(`<div class="type">${d.type}: ${d.percentage}%</div>`)
          .style('left', `${d3.pointer(event)[0] + 20}px`)
          .style('top', `${d3.pointer(event)[1] - 20}px`)
          .style('display', null);
      })
      .on('mouseout', function(d) {
        d3.select(this).transition().duration('100').attr('opacity', '1');
        tooltip.style('display', 'none');
      })

      svgBar.selectAll('.text')
      .data(shelterTypes)
      .enter()
      .append('text')
        .attr('class', 'label')
        .attr('x', function(d) { return xScaleBar(d.type) + xScaleBar.bandwidth() / 2; })
        .attr('y', function(d) { return yScaleBar(d.percentage) - 10 })
        .text(function(d) { return d.percentage + '%'; })
  
  // Add title to the bar chart
  d3.select("#bar-chart-title")
    .style("text-anchor", "middle")
    .text("Population in different shelter types in Za'atari Refugee Camp");
});