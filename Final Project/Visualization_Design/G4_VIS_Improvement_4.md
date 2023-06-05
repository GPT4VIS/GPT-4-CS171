---
**Question:** 
This is an interactive data visualization system.
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interactive Happiness Data Visualization</title>
  <script src="https://d3js.org/d3.v6.min.js"></script>
  <style>
  </style>
</head>
<body>
<h1>World Happiness Report 2020</h1>
<div>
  <label for="xAxis">X-axis:</label>
  <select id="xAxis">
    <option value="Happiness score">Happiness score</option>
    <option value="Logged GDP per capita">Logged GDP per capita</option>
    <option value="Social support score">Social support score</option>
    <option value="Healthy life expectancy">Healthy life expectancy</option>
    <option value="Freedom score">Freedom score</option>
    <option value="Generosity score">Generosity score</option>
    <option value="Perceptions of corruption score">Perceptions of corruption score</option>
  </select>
</div>
<div>
  <label for="yAxis">Y-axis:</label>
  <select id="yAxis">
    <option value="Happiness score">Happiness score</option>
    <option value="Logged GDP per capita">Logged GDP per capita</option>
    <option value="Social support score">Social support score</option>
    <option value="Healthy life expectancy">Healthy life expectancy</option>
    <option value="Freedom score">Freedom score</option>
    <option value="Generosity score">Generosity score</option>
    <option value="Perceptions of corruption score">Perceptions of corruption score</option>
  </select>
</div>
<div id="tooltip" style="opacity:0;position:absolute;"></div>
<svg width="960" height="500"></svg>
<script>
  // Set the dimensions and margins of the graph
  const margin = {top: 20, right: 20, bottom: 50, left: 50};
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3.select("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const tooltip = d3.select("#tooltip");

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  const zoom = d3.zoom()
          .scaleExtent([1, 10])
          .on("zoom", zoomed);

  const rect = svg.append("rect")
          .attr("width", width)
          .attr("height", height)
          .style("fill", "none")
          .style("pointer-events", "all")
          .call(zoom);

  svg.append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0,${height})`)
          .call(xAxis);

  svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

  function zoomed(event) {
    svg.selectAll(".circle")
            .attr("transform", event.transform);
    svg.select(".x.axis")
            .call(xAxis.scale(event.transform.rescaleX(x)));
    svg.select(".y.axis")
            .call(yAxis.scale(event.transform.rescaleY(y)));
  }

  const updateGraph = (data, xValue, yValue) => {
    x.domain(d3.extent(data, d => d[xValue])).nice();
    y.domain(d3.extent(data, d => d[yValue])).nice();
    color.domain(d3.map(data, d => d.Region).keys());

    const circles = svg.selectAll(".circle")
            .data(data, d => d.Country);

    circles.enter()
            .append("circle")
            .attr("class", "circle")
            .attr("r", 5)
            .attr("country", d => d.Country) // Add country name to the element's data attribute
            .merge(circles)
            .attr("cx", d => x(d[xValue]))
            .attr("cy", d => y(d[yValue]))
            .style("fill", d => color(d.Region))
            .on("mouseover", function (event, d) { // Event listener for mouseover
              tooltip.transition()
                      .duration(200)
                      .style("opacity", 0.9);
              tooltip.html(d.Country)
                      .style("left", (event.pageX) + "px")
                      .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) { // Event listener for mouseout
              tooltip.transition()
                      .duration(500)
                      .style("opacity", 0);
            });

    circles.exit().remove();

    svg.select(".x.axis")
            .transition()
            .duration(500)
            .call(xAxis);

    svg.select(".y.axis")
            .transition()
            .duration(500)
            .call(yAxis);

    svg.selectAll(".axis-title").remove();

    svg.append("text")
            .attr("class", "axis-title")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom / 1.5)
            .style("text-anchor", "middle")
            .text(xValue);

    svg.append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left / 1.5)
            .attr("x", -height / 2)
            .style("text-anchor", "middle")
            .text(yValue);

  };

  d3.csv("../data/happiness_data_sample.csv", d3.autoType).then(data => {
    const xSelect = document.getElementById("xAxis");
    const ySelect = document.getElementById("yAxis");

    updateGraph(data, xSelect.value, ySelect.value);

    xSelect.addEventListener("change", () => {
      updateGraph(data, xSelect.value, ySelect.value);
    });

    ySelect.addEventListener("change", () => {
      updateGraph(data, xSelect.value, ySelect.value);
    });
  });
</script>
</body>
</html>
```
Please add a feature: I can cancel the zoom and go back to the original state.
Please give me the new code directly.



**Answer:** Sure! I added a reset button that you can click to reset the zoom. Here's the updated code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interactive Happiness Data Visualization</title>
  <script src="https://d3js.org/d3.v6.min.js"></script>
  <style>
  </style>
</head>
<body>
<h1>World Happiness Report 2020</h1>
<div>
  <label for="xAxis">X-axis:</label>
  <select id="xAxis">
    <option value="Happiness score">Happiness score</option>
    <option value="Logged GDP per capita">Logged GDP per capita</option>
    <option value="Social support score">Social support score</option>
    <option value="Healthy life expectancy">Healthy life expectancy</option>
    <option value="Freedom score">Freedom score</option>
    <option value="Generosity score">Generosity score</option>
    <option value="Perceptions of corruption score">Perceptions of corruption score</option>
  </select>
</div>
<div>
  <label for="yAxis">Y-axis:</label>
  <select id="yAxis">
    <option value="Happiness score">Happiness score</option>
    <option value="Logged GDP per capita">Logged GDP per capita</option>
    <option value="Social support score">Social support score</option>
    <option value="Healthy life expectancy">Healthy life expectancy</option>
    <option value="Freedom score">Freedom score</option>
    <option value="Generosity score">Generosity score</option>
    <option value="Perceptions of corruption score">Perceptions of corruption score</option>
  </select>
</div>
<button id="resetZoom">Reset Zoom</button>
<div id="tooltip" style="opacity:0;position:absolute;"></div>
<svg width="960" height="500"></svg>
<script>
  // Set the dimensions and margins of the graph
  const margin = {top: 20, right: 20, bottom: 50, left: 50};
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3.select("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const tooltip = d3.select("#tooltip");

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  const zoom = d3.zoom()
          .scaleExtent([1, 10])
          .on("zoom", zoomed);

  const rect = svg.append("rect")
          .attr("width", width)
          .attr("height", height)
          .style("fill", "none")
          .style("pointer-events", "all")
          .call(zoom);

  svg.append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0,${height})`)
          .call(xAxis);

  svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

  function zoomed(event) {
    svg.selectAll(".circle")
            .attr("transform", event.transform);
    svg.select(".x.axis")
            .call(xAxis.scale(event.transform.rescaleX(x)));
    svg.select(".y.axis")
            .call(yAxis.scale(event.transform.rescaleY(y)));
  }

  function resetZoom() {
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity,
      d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
    );
  }

  const updateGraph = (data, xValue, yValue) => {
    x.domain(d3.extent(data, d => d[xValue])).nice();
    y.domain(d3.extent(data, d => d[yValue])).nice();
    color.domain(d3.map(data, d => d.Region).keys());

    const circles = svg.selectAll(".circle")
            .data(data, d => d.Country);

    circles.enter()
            .append("circle")
            .attr("class", "circle")
            .attr("r", 5)
            .attr("country", d => d.Country) // Add country name to the element's data attribute
            .merge(circles)
            .attr("cx", d => x(d[xValue]))
            .attr("cy", d => y(d[yValue]))
            .style("fill", d => color(d.Region))
            .on("mouseover", function (event, d) { // Event listener for mouseover
              tooltip.transition()
                      .duration(200)
                      .style("opacity", 0.9);
              tooltip.html(d.Country)
                      .style("left", (event.pageX) + "px")
                      .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) { // Event listener for mouseout
              tooltip.transition()
                      .duration(500)
                      .style("opacity", 0);
            });

    circles.exit().remove();

    svg.select(".x.axis")
            .transition()
            .duration(500)
            .call(xAxis);

    svg.select(".y.axis")
            .transition()
            .duration(500)
            .call(yAxis);

    svg.selectAll(".axis-title").remove();

    svg.append("text")
            .attr("class", "axis-title")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom / 1.5)
            .style("text-anchor", "middle")
            .text(xValue);

    svg.append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left / 1.5)
            .attr("x", -height / 2)
            .style("text-anchor", "middle")
            .text(yValue);

  };

  d3.csv("../data/happiness_data_sample.csv", d3.autoType).then(data => {
    const xSelect = document.getElementById("xAxis");
    const ySelect = document.getElementById("yAxis");

    updateGraph(data, xSelect.value, ySelect.value);

    xSelect.addEventListener("change", () => {
      updateGraph(data, xSelect.value, ySelect.value);
    });

    ySelect.addEventListener("change", () => {
      updateGraph(data, xSelect.value, ySelect.value);
    });
  });

  document.getElementById("resetZoom").addEventListener("click", () => {
    resetZoom();
  });

</script>
</body>
</html>
```

