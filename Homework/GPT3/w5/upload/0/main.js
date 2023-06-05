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

});