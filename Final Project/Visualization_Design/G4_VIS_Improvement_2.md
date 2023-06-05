---
**Question:** 
Here is an interactive data visualization system.

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

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

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
            .merge(circles)
            .attr("cx", d => x(d[xValue]))
            .attr("cy", d => y(d[yValue]))
            .style("fill", d => color(d.Region));

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

This is the data it uses:
```happiness_data_sample.csv
Country,Region,Latitude,Longitude,Happiness score,Logged GDP per capita,Social support score,Healthy life expectancy,Freedom score,Generosity score,Perceptions of corruption score,Date
Jamaica,Latin America and Caribbean,18.109581,-77.297508,5.89,9.006,0.916,67.1,0.858,-0.125,0.889,1/1/2020
El Salvador,Latin America and Caribbean,13.794185,-88.89653,6.348,8.909,0.806,66.108,0.834,-0.121,0.754,1/1/2020
Moldova,Commonwealth of Independent States,47.411631,28.369885,5.608,8.777,0.843,65.013,0.722,-0.038,0.913,1/1/2020
Tunisia,Middle East and North Africa,33.886917,9.537499,4.392,9.315,0.689,66.898,0.593,-0.216,0.868,1/1/2020
Brazil,Latin America and Caribbean,-14.235004,-51.92528,6.376,9.566,0.897,66.48,0.8,-0.102,0.771,1/1/2020
Gabon,Sub-Saharan Africa,-0.803689,11.609444,4.829,9.681,0.788,59.715,0.705,-0.222,0.849,1/1/2020
Cameroon,Sub-Saharan Africa,7.369722,12.354722,5.085,8.119,0.7,52.705,0.763,-0.001,0.851,1/1/2020
Costa Rica,Latin America and Caribbean,9.748917,-83.753428,7.121,9.658,0.902,71.3,0.935,-0.102,0.786,1/1/2020
Thailand,Southeast Asia,15.870032,100.992541,5.999,9.742,0.89,67.251,0.905,0.269,0.886,1/1/2020
Cyprus,Western Europe,35.126413,33.429859,6.159,10.406,0.806,73.702,0.78,0.044,0.856,1/1/2020
Tanzania,Sub-Saharan Africa,-6.369028,34.888822,3.476,7.968,0.689,57.496,0.822,0.11,0.62,1/1/2020
Sierra Leone,Sub-Saharan Africa,8.460555,-11.779889,3.926,7.269,0.636,50.865,0.715,0.089,0.861,1/1/2020
Croatia,Central and Eastern Europe,45.1,15.2,5.505,10.071,0.875,70.215,0.715,-0.129,0.916,1/1/2020
Niger,Sub-Saharan Africa,17.607789,8.081666,4.91,6.842,0.617,53.5,0.76,0.014,0.723,1/1/2020
Netherlands,Western Europe,52.132633,5.291266,7.449,10.813,0.939,72.301,0.909,0.208,0.365,1/1/2020
Benin,Sub-Saharan Africa,9.30769,2.315834,5.216,7.674,0.469,54.312,0.735,-0.004,0.741,1/1/2020
Germany,Western Europe,51.165691,10.451526,7.076,10.733,0.899,72.202,0.867,0.08,0.456,1/1/2020
Senegal,Sub-Saharan Africa,14.497401,-14.452362,4.981,8.119,0.724,59.599,0.691,-0.052,0.809,1/1/2020
Macedonia,Central and Eastern Europe,41.608635,21.745275,5.16,9.511,0.82,67.504,0.739,-0.02,0.897,1/1/2020
Bulgaria,Central and Eastern Europe,42.733883,25.48583,5.102,9.869,0.938,66.804,0.745,-0.144,0.936,1/1/2020
```

Can you add this function to the code: when hovering over a circle, the country name is displayed. 
Please add the country name to the element's html data.


**Answer:** Sure, I can add that functionality for you. I have modified the script part of your code to show the country name when hovering over a circle. Please find the changes below:

```javascript
<script>
    // ....(previous code unchanged)....

    const updateGraph = (data, xValue, yValue) => {
        // ....(previous code unchanged)....

        circles.enter()
            .append("circle")
            .attr("class", "circle")
            .attr("r", 5)
            .attr("data-country", d => d.Country) // Add country name to the element's data attribute
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

        // ....(previous code unchanged)....
    };
    
    // ....(remaining code unchanged)....
</script>
```

I have added an event listener for "mouseover" and "mouseout" events on the circles. When hovering over a circle, the tooltip will display the country name, and when the mouse leaves the circle, the tooltip will be hidden.

