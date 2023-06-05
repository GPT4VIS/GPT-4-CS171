---
**Question:** 
This is what you see in a data visualization system, including the text and svg figure:
World Happiness Report 2020
X-axis: Happiness score
Y-axis: Healthy life expectancy
```
<svg width="960" height="500"><g transform="translate(50,20)"><rect width="890" height="430" style="fill: none; pointer-events: all;"></rect><g class="x axis" transform="translate(0,430)" fill="none" font-size="10" font-family="sans-serif" text-anchor="middle"><path class="domain" stroke="currentColor" d="M0,6V0H890V6"></path><g class="tick" opacity="1" transform="translate(197.77777777777777,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">4</text></g><g class="tick" opacity="1" transform="translate(593.3333333333333,0)"><line stroke="currentColor" y2="6"></line><text fill="currentColor" y="9" dy="0.71em">6</text></g></g><g class="y axis" fill="none" font-size="10" font-family="sans-serif" text-anchor="end"><path class="domain" stroke="currentColor" d="M-6,430H0V0H-6"></path><g class="tick" opacity="1" transform="translate(0,430)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">50</text></g><g class="tick" opacity="1" transform="translate(0,250.83333333333331)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">60</text></g><g class="tick" opacity="1" transform="translate(0,71.66666666666666)"><line stroke="currentColor" x2="-6"></line><text fill="currentColor" x="-9" dy="0.32em">70</text></g></g><circle class="circle" r="5" country="Jamaica" cx="571.5777777777777" cy="123.62500000000009" style="fill: rgb(31, 119, 180);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="El Salvador" cx="662.16" cy="141.39833333333328" style="fill: rgb(31, 119, 180);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Moldova" cx="515.8044444444444" cy="161.01708333333323" style="fill: rgb(255, 127, 14);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Tunisia" cx="275.30666666666673" cy="127.24416666666673" style="fill: rgb(44, 160, 44);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Brazil" cx="667.6977777777779" cy="134.73333333333323" style="fill: rgb(31, 119, 180);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Gabon" cx="361.7355555555555" cy="255.93958333333325" style="fill: rgb(214, 39, 40);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Cameroon" cx="412.3666666666667" cy="381.53541666666666" style="fill: rgb(214, 39, 40);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Costa Rica" cx="815.0422222222223" cy="48.375000000000064" style="fill: rgb(31, 119, 180);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Thailand" cx="593.1355555555555" cy="120.91958333333326" style="fill: rgb(148, 103, 189);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Cyprus" cx="624.78" cy="5.339166666666699" style="fill: rgb(140, 86, 75);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Tanzania" cx="94.14222222222222" cy="295.69666666666666" style="fill: rgb(214, 39, 40);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Sierra Leone" cx="183.14222222222224" cy="414.5020833333333" style="fill: rgb(214, 39, 40);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Croatia" cx="495.43333333333334" cy="67.81458333333329" style="fill: rgb(227, 119, 194);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Niger" cx="377.7555555555556" cy="367.29166666666663" style="fill: rgb(214, 39, 40);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Netherlands" cx="879.9133333333333" cy="30.440416666666632" style="fill: rgb(140, 86, 75);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Benin" cx="438.27555555555557" cy="352.7433333333334" style="fill: rgb(214, 39, 40);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Germany" cx="806.1422222222221" cy="32.2141666666667" style="fill: rgb(140, 86, 75);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Senegal" cx="391.79777777777775" cy="258.01791666666674" style="fill: rgb(214, 39, 40);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Macedonia" cx="427.20000000000005" cy="116.3866666666666" style="fill: rgb(227, 119, 194);" transform="translate(0,0) scale(1)"></circle><circle class="circle" r="5" country="Bulgaria" cx="415.72888888888895" cy="128.9283333333333" style="fill: rgb(227, 119, 194);" transform="translate(0,0) scale(1)"></circle><text class="axis-title" x="445" y="463.3333333333333" style="text-anchor: middle;">Happiness score</text><text class="axis-title" transform="rotate(-90)" y="-33.333333333333336" x="-215" style="text-anchor: middle;">Healthy life expectancy</text></g></svg>
```
------
And the following is the source code of this visualization.
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

  const xAxis = d3.axisBottom(x).ticks(2);
  const yAxis = d3.axisLeft(y).ticks(2);

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

Can you interact with the chart using Javascript? I mean using Javascript to dispatch an event to interact with the chart.
For example, show the correlation between Happiness score and Social support score, and zoom in to look at the data in the top right corner.
Please show me the code.


**Answer:** You can use JavaScript to interact with the chart by dispatching events to change the axes and apply a zoom. In this case, you want to show the correlation between Happiness score and Social support score, and zoom in to the top right corner. To achieve that, you can add the following JavaScript code after the existing code:

```javascript
// Change the x-axis to Happiness score
const xEvent = new Event('change');
document.getElementById('xAxis').value = 'Happiness score';
document.getElementById('xAxis').dispatchEvent(xEvent);

// Change the y-axis to Social support score
const yEvent = new Event('change');
document.getElementById('yAxis').value = 'Social support score';
document.getElementById('yAxis').dispatchEvent(yEvent);

// Find the data extents for the updated axes
d3.csv("../data/happiness_data_sample.csv", d3.autoType).then(data => {
  const xRange = d3.extent(data, d => d['Happiness score']);
  const yRange = d3.extent(data, d => d['Social support score']);

  // Calculate the coordinates for the top right corner
  const topRightX = xRange[1] - (xRange[1] - xRange[0]) * 0.2; // 80% of x extent
  const topRightY = yRange[1] - (yRange[1] - yRange[0]) * 0.2; // 80% of y extent

  // Find the screen coordinates of the top right corner
  const screenTopRightX = x(topRightX);
  const screenTopRightY = y(topRightY);

  // Calculate the zoom level and position
  const scaleFactor = 2;
  const translateX = (width / 2 - screenTopRightX) * (scaleFactor - 1);
  const translateY = (height / 2 - screenTopRightY) * (scaleFactor - 1);

  // Apply the zoom transformation
  svg.transition().duration(750).call(
    zoom.transform,
    d3.zoomIdentity.translate(translateX, translateY).scale(scaleFactor)
  );
});
```

This code snippet dispatches change events for the xAxis and yAxis drop-downs to set the x-axis to Happiness score and the y-axis to Social support score. It then calculates the coordinates for the top right corner of the chart and applies a zoom transformation to focus on that area.

